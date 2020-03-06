const SET_USER_DATA = 'SET_USER_DATA';
const ISFETCHING_TOGGLE = 'ISFETCHING_TOGGLE';


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
    case ISFETCHING_TOGGLE:
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
    type: ISFETCHING_TOGGLE,
    isFetching
  }
}

export default authReducer;