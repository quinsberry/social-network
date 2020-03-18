import React from 'react';
import { Field, reduxForm } from 'redux-form';


const LoginForm = ({ handleSubmit }) => {
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="login__form-input">
        <Field name={'login'} placeholder="Login" component={'input'} />
      </div>
      <div className="login__form-input">
        <Field name={'password'} placeholder="Password" component={'input'} />
      </div>
      <div className="login__form-submit">
        <button>Login</button>
        <Field name={'rememberMe'} type="checkbox" component={'input'} /> Remember me
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm);

export default LoginReduxForm;