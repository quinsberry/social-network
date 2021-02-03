import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { LoginForm } from './LoginForm'

import { TLoginFormValues } from '@typings/types'

import './Login.scss'
import { getCaptchaUrl, getIsAuth } from '@store/selectors/authSelectors'
import { loginTC } from '@store/reducers/authReducer'

interface LoginProps {}

export const LoginPage: React.FC<LoginProps> = (): React.ReactElement => {
  const dispatch = useDispatch()
  const isAuth = useSelector(getIsAuth)
  const captchaUrl = useSelector(getCaptchaUrl)

  const onSubmit = (formData: TLoginFormValues): void => {
    const { email, password, rememberMe, captcha } = formData
    dispatch(loginTC(email, password, rememberMe, captcha))
  }

  if (isAuth) {
    return <Redirect to="/profile" />
  }

  return (
    <div className="login">
      <div className="login__form">
        <h2>Sign in</h2>
        <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
      </div>
    </div>
  )
}
