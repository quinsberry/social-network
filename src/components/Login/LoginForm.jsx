import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { required } from '../../utils/validators';
import { Input } from '../common/FormsControls/FormsControls';

const LoginForm = ({ handleSubmit }) => {
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="login__form-input">
        <Field name={'login'} placeholder="Login" className="input" validate={[required]} component={Input} />
      </div>
      <div className="login__form-input">
        <Field name={'password'} placeholder="Password" className="input" validate={[required]} component={Input} />
      </div>
      <div className="login__form-submit">
        <button>Login</button>
        <Field name={'rememberMe'} type="checkbox" component={Input} /> Remember me
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm);

export default LoginReduxForm;