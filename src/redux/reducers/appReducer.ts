import { getAuthUserDataTC } from './authReducer';


const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';
const LAZY_LOADING = 'app/LAZY_LOADING';

type TInitialState = {
  initialized: boolean
  lazyLoading: boolean
}

type TInitializedSuccess = {
  type: typeof INITIALIZED_SUCCESS
}

type TLazyLoading = {
  type: typeof LAZY_LOADING
}


const initialState: TInitialState = {
  initialized: false,
  lazyLoading: false
}

const appReducer = (state = initialState, action: any): TInitialState => {
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

export const initializedSuccess = (): TInitializedSuccess => ({
  type: INITIALIZED_SUCCESS
})

export const lazyLoading = (): TLazyLoading => ({
  type: LAZY_LOADING
})

export const initializeApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(getAuthUserDataTC());
    promise.then(() => {
      dispatch(initializedSuccess());
    });
  }
}






export default appReducer;