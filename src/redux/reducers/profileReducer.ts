import { profileAPI } from '../../api/profile-api'
import { stopSubmit } from 'redux-form'

import { TAppState, TInferActions, TPost, TPhotos, TProfile, ResultCodes } from '../../types/types'
import { ThunkAction } from 'redux-thunk'

const ADD_POST = 'profile/ADD_POST'
const DELETE_POST = 'profile/DELETE_POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const IS_FETCHING_TOGGLE = 'profile/IS_FETCHING_TOGGLE'
const IS_PROCESSING = 'profile/IS_PROCESSING'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'
const SAVE_PROFILE_SUCCESS = 'profile/SAVE_PROFILE_SUCCESS'




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
  status: "" as string | null,
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

type TActions = TInferActions<typeof actions>


export const actions = {
  addPost: (newPostText: string) => ({ type: ADD_POST, newPostText } as const),
  deletePost: (postId: number) => ({ type: DELETE_POST, postId } as const),
  setUserProfile: (profile: TProfile) => ({ type: SET_USER_PROFILE, profile } as const),
  setProfileStatus: (status: string | null) => ({ type: SET_STATUS, status } as const),
  setIsProcessing: () => ({ type: IS_PROCESSING } as const),
  setIsFetchingToggle: () => ({ type: IS_FETCHING_TOGGLE } as const),
  savePhotoSuccess: (photos: TPhotos) => ({ type: SAVE_PHOTO_SUCCESS, photos } as const),
  saveProfileSuccess: () => ({ type: SAVE_PROFILE_SUCCESS } as const)
}



type TThunk = ThunkAction<Promise<void>, TAppState, unknown, TActions>

export const addPostTC = (newPostText: string): TThunk => {
  return async (dispatch) => {
    dispatch(actions.addPost(newPostText))
  }
}

export const deletePost = (postId: number): TThunk => {
  return async (dispatch) => {
    dispatch(actions.deletePost(postId))
  }
}

export const getUserProfileTC = (userId: number | null): TThunk => {
  return async (dispatch) => {
    if (userId) {
      dispatch(actions.setIsFetchingToggle())

      const data = await profileAPI.getProfile(userId)

      dispatch(actions.setIsFetchingToggle())
      dispatch(actions.setUserProfile(data))
    }

  }
}

export const getUserProfileStatusTC = (userId: number): TThunk => {
  return async (dispatch) => {
    if (userId) {
      const data = await profileAPI.getStatus(userId)

      dispatch(actions.setProfileStatus(data))
    }
  }
}

export const updateUserProfileStatusTC = (status: string): TThunk => {
  return async (dispatch) => {
    dispatch(actions.setIsFetchingToggle())

    const res = await profileAPI.updateStatus(status)

    dispatch(actions.setIsFetchingToggle())
    if (res.resultCode === ResultCodes.Success) {
      dispatch(actions.setProfileStatus(status))
    }
  }
}

export const savePhotoTC = (file: any): TThunk => {
  return async (dispatch) => {

    const res = await profileAPI.savePhoto(file)

    if (res.resultCode === ResultCodes.Success) {
      dispatch(actions.savePhotoSuccess(res.data.photos))
    }
  }
}

export const saveProfileTC = (profile: TProfile): TThunk => {

  return async (dispatch, getState) => {
    const userId = getState().auth.userId
    dispatch(actions.setIsProcessing())
    const res = await profileAPI.saveProfile(profile)
    dispatch(actions.setIsProcessing())

    if (res.resultCode === ResultCodes.Success) {
      dispatch(actions.saveProfileSuccess())
      dispatch(getUserProfileTC(userId))
    } else {
      dispatch(stopSubmit('editProfile', { _error: res.messages[0] }))
    }
  }
}


export default profileReducer