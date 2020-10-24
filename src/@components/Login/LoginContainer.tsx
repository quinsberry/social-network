import React from 'react'
import { connect } from 'react-redux'

import { loginTC } from '@store/reducers/authReducer'
import { getIsAuth, getCaptchaUrl } from '@store/selectors/authSelectors'
import Login from './Login'

import { TAppState, TLoginFormValues } from '@typings/types'

type TMapState = {
  isAuth: boolean
  captchaUrl: null | string
}

type TMapDispatch = {
  loginTC: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

type Props = TMapState & TMapDispatch

const LoginContainer: React.FC<Props> = ({ isAuth, captchaUrl, loginTC }) => {
  const onSubmit = (formData: TLoginFormValues) => {
    const { email, password, rememberMe, captcha } = formData
    loginTC(email, password, rememberMe, captcha)
  }

  return <Login onSubmit={onSubmit} isAuth={isAuth} captchaUrl={captchaUrl} />
}

const mapStateToProps = (state: TAppState): TMapState => {
  return {
    isAuth: getIsAuth(state),
    captchaUrl: getCaptchaUrl(state),
  }
}

export default connect<TMapState, TMapDispatch, {}, TAppState>(mapStateToProps, {
  loginTC,
})(LoginContainer)
