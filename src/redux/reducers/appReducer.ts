import { getAuthUserDataTC } from './authReducer'

import { TAppState } from '../../types/types'
import { ThunkAction } from 'redux-thunk'

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'
const LAZY_LOADING = 'app/LAZY_LOADING'

type TInitialState = {
  initialized: boolean
  lazyLoading: boolean
}



const initialState: TInitialState = {
  initialized: false,
  lazyLoading: false
}

const appReducer = (state = initialState, action: TActions): TInitialState => {
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
      return state
  }
}

type TActions = TInitializedSuccess | TLazyLoading

type TInitializedSuccess = {
  type: typeof INITIALIZED_SUCCESS
}

type TLazyLoading = {
  type: typeof LAZY_LOADING
}

export const initializedSuccess = (): TInitializedSuccess => ({
  type: INITIALIZED_SUCCESS
})

export const lazyLoading = (): TLazyLoading => ({
  type: LAZY_LOADING
})

type TThunk = ThunkAction<Promise<void>, TAppState, unknown, TActions>

export const initializeApp = (): TThunk => {
  return async (dispatch) => {
    let promise = dispatch(getAuthUserDataTC())
    promise.then(() => {
      dispatch(initializedSuccess())
    });
  }
}






export default appReducer