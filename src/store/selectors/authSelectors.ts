import { TAppState } from '@typings/types'

export const getUserId = (state: TAppState) => {
  return state.auth.userId
}
export const getEmail = (state: TAppState) => {
  return state.auth.email
}
export const getLogin = (state: TAppState) => {
  return state.auth.login
}

export const getIsAuth = (state: TAppState) => {
  return state.auth.isAuth
}

export const getCaptchaUrl = (state: TAppState) => {
  return state.auth.captchaUrl
}
