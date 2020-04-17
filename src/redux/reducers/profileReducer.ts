import { profileAPI } from '../../api/api';
import { stopSubmit } from 'redux-form';

import { TAppState, TPost, TPhotos, TProfile } from '../../types/types';
import { ThunkAction } from 'redux-thunk'

const ADD_POST = 'profile/ADD_POST';
const DELETE_POST = 'profile/DELETE_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const IS_FETCHING_TOGGLE = 'profile/IS_FETCHING_TOGGLE';
const IS_PROCESSING = 'profile/IS_PROCESSING';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';
const SAVE_PROFILE_SUCCESS = 'profile/SAVE_PROFILE_SUCCESS';

type TInitialState = typeof initialState

const initialState = {
  profile: null as TProfile | null,
  posts: [
    {
      id: 1,
      postMessage: 'Hey everyone!!',
      likes: 0
    },
    {
      id: 2,
      postMessage: 'Nice day.',
      likes: 5
    },
    {
      id: 3,
      postMessage: 'Im newbee, Hello!',
      likes: 23
    },
  ] as Array<TPost>,
  status: "",
  isFetching: false as boolean,
  isProcessing: false as boolean
};



const profileReducer = (state = initialState, action: TActions): TInitialState => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        postMessage: action.newPostText,
        likes: 0
      };
      return {
        ...state,
        posts: [...state.posts, newPost]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postId)
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status
      }
    case IS_FETCHING_TOGGLE:
      return {
        ...state,
        isFetching: !state.isFetching
      }
    case IS_PROCESSING:
      return {
        ...state,
        isProcessing: !state.isProcessing
      }
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as TProfile
      }
    case SAVE_PROFILE_SUCCESS:
      return {
        ...state
      }
    default:
      return state;
  }
}

type TActions = TAddPost | TDeletePost | TSetUserProfile | TSetProfileStatus | TSetIsProcessing | TSetIsFetchingToggle | TSavePhotoSuccess | TSaveProfileSuccess

type TAddPost = {
  type: typeof ADD_POST
  newPostText: string
}
type TDeletePost = {
  type: typeof DELETE_POST
  postId: number
}
type TSetUserProfile = {
  type: typeof SET_USER_PROFILE
  profile: TProfile
}
type TSetProfileStatus = {
  type: typeof SET_STATUS
  status: string
}
type TSetIsProcessing = {
  type: typeof IS_PROCESSING
}
type TSetIsFetchingToggle = {
  type: typeof IS_FETCHING_TOGGLE
}
type TSavePhotoSuccess = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: TPhotos
}
type TSaveProfileSuccess = {
  type: typeof SAVE_PROFILE_SUCCESS
}

export const addPost = (newPostText: string): TAddPost => {
  return {
    type: ADD_POST,
    newPostText
  }
}
export const deletePost = (postId: number): TDeletePost => {
  return {
    type: DELETE_POST,
    postId
  }
}
export const setUserProfile = (profile: TProfile): TSetUserProfile => {
  return {
    type: SET_USER_PROFILE,
    profile
  }
}
export const setProfileStatus = (status: string): TSetProfileStatus => {
  return {
    type: SET_STATUS,
    status
  }
}
export const setIsProcessing = (): TSetIsProcessing => {
  return {
    type: IS_PROCESSING
  }
}
export const setIsFetchingToggle = (): TSetIsFetchingToggle => {
  return {
    type: IS_FETCHING_TOGGLE
  }
}
export const savePhotoSuccess = (photos: TPhotos): TSavePhotoSuccess => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos
  }
}
export const saveProfileSuccess = (): TSaveProfileSuccess => {
  return {
    type: SAVE_PROFILE_SUCCESS
  }
}

type TThunk = ThunkAction<Promise<void>, TAppState, unknown, TActions>

export const getUserProfileTC = (userId: number | null): TThunk => {
  return async (dispatch) => {
    if (userId) {
      dispatch(setIsFetchingToggle());

      const data = await profileAPI.getProfile(userId);

      dispatch(setIsFetchingToggle());
      dispatch(setUserProfile(data));
    }

  }
}

export const getUserProfileStatusTC = (userId: number): TThunk => {
  return async (dispatch) => {
    if (userId) {
      const data = await profileAPI.getStatus(userId);

      dispatch(setProfileStatus(data));
    }
  }
}

export const updateUserProfileStatusTC = (status: string): TThunk => {
  return async (dispatch) => {
    dispatch(setIsFetchingToggle());

    const res = await profileAPI.updateStatus(status)

    dispatch(setIsFetchingToggle());
    if (res.data.resultCode === 0) {
      dispatch(setProfileStatus(status));
    }
  }
}

export const savePhotoTC = (file: any): TThunk => {
  return async (dispatch) => {

    const res = await profileAPI.savePhoto(file);

    if (res.resultCode === 0) {
      dispatch(savePhotoSuccess(res.data.photos));
    }
  }
}

export const saveProfileTC = (profile: TProfile): TThunk => {

  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    dispatch(setIsProcessing());
    const res = await profileAPI.saveProfile(profile);
    dispatch(setIsProcessing());

    if (res.resultCode === 0) {
      dispatch(saveProfileSuccess());
      dispatch(getUserProfileTC(userId));
    } else {
      dispatch(stopSubmit('editProfile', { _error: res.messages[0] }));
    }
  }
}


export default profileReducer;