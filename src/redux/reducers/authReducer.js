import { stopSubmit } from 'redux-form';

import { authAPI } from '../../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const IS_FETCHING_TOGGLE = 'IS_FETCHING_TOGGLE';


let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data
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

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  data: { userId, email, login, isAuth }
})

export const setIsFetchingToggle = (isFetching) => {
  return {
    type: IS_FETCHING_TOGGLE,
    isFetching
  }
}





export const getAuthUserDataTC = (isAuth) => {
  return (dispatch) => {
    if (isAuth !== true) {
      dispatch(setIsFetchingToggle(true));
      authAPI.me()
        .then(res => {
          if (res.data.resultCode === 0) {
            const { id, email, login } = res.data.data;
            dispatch(setAuthUserData(id, email, login, true));
            dispatch(setIsFetchingToggle(false));
          }
        });
    }
  }
}

export const loginTC = (email, password, rememberMe) => {
  return (dispatch) => {

    authAPI.login(email, password, rememberMe)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(getAuthUserDataTC());
        } else if (res.data.resultCode === 1) {
          const message = res.data.messages.length !== 0 ? res.data.messages[0] : 'Email or password are wrong';
          const action = stopSubmit('login', { _error: message });
          dispatch(action);
        }
      });
  }
}

export const logoutTC = () => {
  return (dispatch) => {
    authAPI.logout()
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setAuthUserData(null, null, null, false));
        }
      });
  }
}

export default authReducer;