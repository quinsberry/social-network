import { TAppState } from '@typings/types'

export const getInitializedSelector = (state: TAppState): boolean => {
  return state.app.initialized
}

export const getIsLoadingSelector = (state: TAppState): boolean => {
  return state.app.lazyLoading
}
