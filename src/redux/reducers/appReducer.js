import { getAuthUserDataTC } from './authReducer';


const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const LAZY_LOADING = 'LAZY_LOADING';


let initialState = {
  initialized: false,
  lazyLoading: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }
    case LAZY_LOADING:
      return {
        ...state,
        lazyLoading: !state.lazyLoading
      }
    default:
      return state;
  }
}

export const InitializedSuccess = () => ({
  type: INITIALIZED_SUCCESS
})

export const lazyLoading = () => ({
  type: LAZY_LOADING
})

export const initializeApp = () => {
  return (dispatch) => {
    let promise = dispatch(getAuthUserDataTC());
    promise.then(() => {
      dispatch(InitializedSuccess());
    });
  }
}






export default appReducer;