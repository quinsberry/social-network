import { getAuthUserDataTC } from './authReducer'

import { TInferActions, TBaseThunk } from '@typings/types'

type TInitialState = typeof initialState

const initialState = {
  initialized: false,
  lazyLoading: false,
}

export const appReducer = (state = initialState, action: TActions): TInitialState => {
  switch (action.type) {
    case 'APP/INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true,
      }
    case 'APP/LAZY_LOADING':
      return {
        ...state,
        lazyLoading: !state.lazyLoading,
      }
    default:
      return state
  }
}

type TActions = TInferActions<typeof actions>

export const actions = {
  initializedSuccess: () => ({ type: 'APP/INITIALIZED_SUCCESS' } as const),
  lazyLoading: () => ({ type: 'APP/LAZY_LOADING' } as const),
  sendMessage: (newMessageText: string) =>
    ({ type: 'DIALOGS/SEND_MESSAGE', newMessageText } as const),
}

type TThunk = TBaseThunk<TActions>

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
    })
  }
}
