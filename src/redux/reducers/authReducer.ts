import { stopSubmit } from 'redux-form';

import { authAPI, securityAPI } from '../../api/api';

import { TAppState, TInferActions, ResultCodes } from '../../types/types'
import { ThunkAction } from 'redux-thunk'

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';
const IS_FETCHING_TOGGLE = 'auth/IS_FETCHING_TOGGLE';





type TInitialState = typeof initialState

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


type TActions = TInferActions<typeof actions>

export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } } as const),
  getCaptchaUrlSuccess: (url: string) => ({ type: GET_CAPTCHA_URL_SUCCESS, url } as const),
  setIsFetchingToggle: (isFetching: boolean) => ({ type: IS_FETCHING_TOGGLE, isFetching } as const)
}



type TThunk = ThunkAction<Promise<void>, TAppState, unknown, TActions>

export const getAuthUserDataTC = (): TThunk => {
  return async (dispatch) => {
    dispatch(actions.setIsFetchingToggle(true))

    const res = await authAPI.me()

    if (res.resultCode === ResultCodes.Success) {
      const { id, email, login } = res.data
      dispatch(actions.setAuthUserData(id, email, login, true))
      dispatch(actions.setIsFetchingToggle(false))
    } else if (res.resultCode === 1) {
      dispatch(actions.setIsFetchingToggle(false))
      return
    }
  }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string | null): TThunk => {
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
      dispatch(actions.setAuthUserData(null, null, null, false));
    }
  }
}

export const getCaptchaUrlTC = (): TThunk => {
  return async (dispatch) => {

    const res = await securityAPI.getCaptchaUrl()
    const captchaUrl = res.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
  }
}

export default authReducer