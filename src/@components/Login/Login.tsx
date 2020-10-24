import React from 'react'
import { Redirect } from 'react-router-dom'

import LoginForm from './LoginForm'

import { TLoginFormValues } from '@typings/types'

import './Login.scss'

type Props = {
  isAuth: boolean
  captchaUrl: null | string
  onSubmit: (formData: TLoginFormValues) => void
}

const Login: React.FC<Props> = ({ onSubmit, isAuth, captchaUrl }) => {
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

export default Login
