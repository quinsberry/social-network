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
        ...action.data,
        isAuth: true
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

export const setAuthUserData = (userId, email, login) => ({
  type: SET_USER_DATA,
  data: { userId, email, login }
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
            dispatch(setAuthUserData(id, email, login));
            dispatch(setIsFetchingToggle(false));
          }
        });
    }
  }
}

export default authReducer;