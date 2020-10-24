import { createSelector } from 'reselect'
import { TAppState } from '@typings/types'

const getUserIdSelector = (state: TAppState) => {
  return state.auth.userId
}

const getIsAuthSelector = (state: TAppState) => {
  return state.auth.isAuth
}

const getCaptchaUrlSelector = (state: TAppState) => {
  return state.auth.captchaUrl
}

export const getCaptchaUrl = createSelector(getCaptchaUrlSelector, (captchaUrl) => {
  return captchaUrl
})
export const getUserId = createSelector(getUserIdSelector, (userId) => {
  return userId
})
export const getIsAuth = createSelector(getIsAuthSelector, (isAuth) => {
  return isAuth
})
