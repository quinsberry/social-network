import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

import { required } from '@utils/validators'
import { Input } from '@components/common/FormsControls/FormsControls'

import { TLoginFormValues } from '@typings/types'

type Props = {
  captchaUrl: string | null
}

const Form: React.FC<InjectedFormProps<TLoginFormValues> & Props> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="login__form-input">
        <Field name={'email'} placeholder="Email" className="input" validate={[required]} component={Input} />
      </div>

      <div className="login__form-input">
        <Field name={'password'} type="password" placeholder="Password" className="input" validate={[required]} component={Input} />
      </div>

      {error && <div className="login__form-error">{error}</div>}

      <div className="login__form-rememberMe">
        <Field name={'rememberMe'} type="checkbox" component={Input} extraText={'Remember me'} />
      </div>

      {captchaUrl && (
        <div className="login__form-captcha">
          <img src={captchaUrl} alt="Captcha icon" />
          <Field name={'captcha'} placeholder="Enter the captcha" className="input" validate={[required]} component={Input} />
        </div>
      )}

      <div className="login__form-submit">
        <button className="btn loginBtn">Login</button>
      </div>
    </form>
  )
}

//@ts-ignore
export const LoginForm = reduxForm<TLoginFormValues, Props>({ form: 'login' })(Form)
