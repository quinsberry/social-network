import { profileAPI } from '../../api/api';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
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
export const setIsFetchingToggle = (isFetching) => {
  return {
    type: IS_FETCHING_TOGGLE,
    isFetching
  }
}



export const getProfileTC = (userId) => {
  return (dispatch) => {
    dispatch(setIsFetchingToggle(true));
    if (!userId) {
      userId = 2;
    }

    profileAPI.getProfile(userId)
      .then(data => {
        dispatch(setIsFetchingToggle(false));
        dispatch(setUserProfile(data));
      });
  }
}



export default profileReducer;