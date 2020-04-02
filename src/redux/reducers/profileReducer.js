import { profileAPI } from '../../api/api';

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const IS_FETCHING_TOGGLE = 'profile/IS_FETCHING_TOGGLE';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

const initialState = {
  profile: null,
  posts: [
    {
      id: 1,
      postMessage: 'Hey everyone!!',
      likes: '0'
    },
    {
      id: 2,
      postMessage: 'Nice day.',
      likes: '5'
    },
    {
      id: 3,
      postMessage: 'Im newbee, Hello!',
      likes: '23'
    },
  ],
  status: "",
  isFetching: false
};



const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        postMessage: action.newPostText,
        likes: 0
      };
      const newState = {
        ...state,
        posts: [...state.posts, newPost]
      }
      return newState;
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
        isFetching: action.isFetching
      }
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos }
      }
    default:
      return state;
  }
}

export const addPost = (newPostText) => {
  return {
    type: ADD_POST,
    newPostText
  }
}
export const deletePost = (postId) => {
  return {
    type: DELETE_POST,
    postId
  }
}
export const setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile
  }
}
export const setProfileStatus = (status) => {
  return {
    type: SET_STATUS,
    status
  }
}
export const setIsFetchingToggle = (isFetching) => {
  return {
    type: IS_FETCHING_TOGGLE,
    isFetching
  }
}

export const savePhotoSuccess = (photos) => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos
  }
}



export const getUserProfileTC = (userId) => {
  return async (dispatch) => {
    if (userId) {
      dispatch(setIsFetchingToggle(true));

      const data = await profileAPI.getProfile(userId);

      dispatch(setIsFetchingToggle(false));
      dispatch(setUserProfile(data));
    }

  }
}

export const getUserProfileStatusTC = (userId) => {
  return async (dispatch) => {
    if (userId) {
      const data = await profileAPI.getStatus(userId);

      dispatch(setProfileStatus(data));
    }
  }
}

export const updateUserProfileStatusTC = (status) => {
  return async (dispatch) => {
    dispatch(setIsFetchingToggle(true));

    const res = await profileAPI.updateStatus(status)

    dispatch(setIsFetchingToggle(false));
    if (res.data.resultCode === 0) {
      dispatch(setProfileStatus(status));
    }
  }
}

export const savePhotoTC = (file) => {
  return async (dispatch) => {

    const res = await profileAPI.savePhoto(file);

    if (res.resultCode === 0) {
      dispatch(savePhotoSuccess(res.data.photos));
    }
  }
}


export default profileReducer;