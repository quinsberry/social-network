import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { required } from '../../utils/validators';
import { Input } from '../common/FormsControls/FormsControls';

const LoginForm = ({ handleSubmit, error }) => {
  console.log('form: ', error);
  return (
    <form action="" onSubmit={handleSubmit}>

      <div className="login__form-input">
        <Field name={'email'} placeholder="Email" className="input" validate={[required]} component={Input} />
      </div>

      <div className="login__form-input">
        <Field name={'password'} type="password" placeholder="Password" className="input" validate={[required]} component={Input} />
      </div>

      {error && (
        <div className="login__form-error">
          {error}
        </div>
      )}

      <div className="login__form-rememberMe">
        <Field name={'rememberMe'} type="checkbox" component={Input} extraText={"Remember me"} />
      </div>

      <div className="login__form-submit">
        <button className="btn loginBtn">Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm);

export default LoginReduxForm;