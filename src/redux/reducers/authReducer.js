import { stopSubmit } from 'redux-form';

import { authAPI } from '../../api/api';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const IS_FETCHING_TOGGLE = 'auth/IS_FETCHING_TOGGLE';


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





export const getAuthUserDataTC = () => {
  return async (dispatch) => {
    dispatch(setIsFetchingToggle(true));

    const res = await authAPI.me();

    if (res.data.resultCode === 0) {
      const { id, email, login } = res.data.data;
      dispatch(setAuthUserData(id, email, login, true));
      dispatch(setIsFetchingToggle(false));
    } else if (res.data.resultCode === 1) {
      dispatch(setIsFetchingToggle(false));
      return;
    }
  }
}

export const loginTC = (email, password, rememberMe) => {
  return async (dispatch) => {

    const res = await authAPI.login(email, password, rememberMe);

    if (res.data.resultCode === 0) {
      dispatch(getAuthUserDataTC());
    } else if (res.data.resultCode === 1) {
      const message = res.data.messages.length !== 0 ? res.data.messages[0] : 'Email or password are wrong';
      const action = stopSubmit('login', { _error: message });
      dispatch(action);
    }
  }
}

export const logoutTC = () => {
  return async (dispatch) => {

    const res = await authAPI.logout();

    if (res.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  }
}

export default authReducer;