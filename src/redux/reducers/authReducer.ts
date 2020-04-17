import { stopSubmit } from 'redux-form';

import { authAPI, securityAPI } from '../../api/api';

import { TAppState, ResultCodes } from '../../types/types'
import { ThunkAction } from 'redux-thunk'

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';
const IS_FETCHING_TOGGLE = 'auth/IS_FETCHING_TOGGLE';


type TInitialState = typeof initialState

type TSetAuthUserDataPayload = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}



const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  captchaUrl: null as string | null,
  isFetching: false as boolean
}

const authReducer = (state = initialState, action: TActions): TInitialState => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
        captchaUrl: null
      }
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        captchaUrl: action.url
      }
    case IS_FETCHING_TOGGLE:
      return {
        ...state,
        isFetching: action.isFetching
      }
    default:
      return state
  }
}

type TActions = TSetAuthUserData | TGetCaptchaUrlSuccess | TSetIsFetchingToggle

type TSetAuthUserData = {
  type: typeof SET_USER_DATA
  payload: TSetAuthUserDataPayload
}

type TGetCaptchaUrlSuccess = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  url: string
}

type TSetIsFetchingToggle = {
  type: typeof IS_FETCHING_TOGGLE
  isFetching: boolean
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): TSetAuthUserData => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth }
})

export const getCaptchaUrlSuccess = (url: string): TGetCaptchaUrlSuccess => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  url
})

export const setIsFetchingToggle = (isFetching: boolean): TSetIsFetchingToggle => {
  return {
    type: IS_FETCHING_TOGGLE,
    isFetching
  }
}


type TThunk = ThunkAction<Promise<void>, TAppState, unknown, TActions>


export const getAuthUserDataTC = (): TThunk => {
  return async (dispatch) => {
    dispatch(setIsFetchingToggle(true))

    const res = await authAPI.me()

    if (res.resultCode === ResultCodes.Success) {
      const { id, email, login } = res.data
      dispatch(setAuthUserData(id, email, login, true))
      dispatch(setIsFetchingToggle(false))
    } else if (res.resultCode === 1) {
      dispatch(setIsFetchingToggle(false))
      return
    }
  }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): TThunk => {
  return async (dispatch) => {

    const res = await authAPI.login(email, password, rememberMe, captcha)

    if (res.resultCode === ResultCodes.Success) {
      dispatch(getAuthUserDataTC())
    } else {
      if (res.resultCode === ResultCodes.CaptchaIsRequired) {
        dispatch(getCaptchaUrlTC())
      }

      const message = res.messages.length !== 0 ? res.messages[0] : 'Email or password are wrong'
      // @ts-ignore
      dispatch(stopSubmit('login', { _error: message }))
    }
  }
}

export const logoutTC = (): TThunk => {
  return async (dispatch) => {

    const res = await authAPI.logout()

    if (res.resultCode === ResultCodes.Success) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  }
}

export const getCaptchaUrlTC = (): TThunk => {
  return async (dispatch) => {

    const res = await securityAPI.getCaptchaUrl()
    const captchaUrl = res.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
  }
}

export default authReducer