import { profileAPI } from '../../api/api';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const IS_FETCHING_TOGGLE = 'IS_FETCHING_TOGGLE';

const initialState = {
  profile: null,
  posts: [
    {
      id: 1,
      postMessage: 'Hey everyone!!',
      likes: '0'
    },
    {
      id: 1,
      postMessage: 'Nice day.',
      likes: '5'
    },
    {
      id: 1,
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



export const getUserProfileTC = (userId) => {
  return (dispatch) => {
    dispatch(setIsFetchingToggle(true));
    if (!userId) {
      userId = 6206;
    }

    profileAPI.getProfile(userId)
      .then(data => {
        dispatch(setIsFetchingToggle(false));
        dispatch(setUserProfile(data));
      });
  }
}

export const getUserProfileStatusTC = (userId) => {
  return (dispatch) => {
    dispatch(setIsFetchingToggle(true));
    if (!userId) {
      userId = 6206;
    }
    profileAPI.getStatus(userId)
      .then(data => {
        dispatch(setIsFetchingToggle(false));
        dispatch(setProfileStatus(data));
      });
  }
}

export const updateUserProfileStatusTC = (status) => {
  return (dispatch) => {
    dispatch(setIsFetchingToggle(true));

    profileAPI.updateStatus(status)
      .then(res => {
        dispatch(setIsFetchingToggle(false));
        if (res.data.resultCode === 0) {
          dispatch(setProfileStatus(status));
        }
      });
  }
}


export default profileReducer;