import { getAuthUserDataTC } from './authReducer'

import { TAppState, TInferActions } from '../../types/types'
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

type TActions = TInferActions<typeof actions>

export const actions = {
  initializedSuccess: () => ({ type: INITIALIZED_SUCCESS } as const),
  lazyLoading: () => ({ type: LAZY_LOADING } as const)
}



type TThunk = ThunkAction<Promise<void>, TAppState, unknown, TActions>

export const lazyLoadingTC = (): TThunk => {
  return async (dispatch) => {
    dispatch(actions.lazyLoading())
  }
}

export const initializeApp = (): TThunk => {
  return async (dispatch) => {
    let promise = dispatch(getAuthUserDataTC())
    promise.then(() => {
      dispatch(actions.initializedSuccess())
    });
  }
}






export default appReducer