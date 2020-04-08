import React from 'react';

import LoginForm from './LoginForm';

import './Login.scss';
import { Redirect } from 'react-router-dom';


const Login = ({ onSubmit, isAuth, captchaUrl }) => {

  if (isAuth) {
    return (
      <Redirect to="/profile" />
    );
  }

  return (
    <div className="login">
      <div className="login__form">
        <h2>Sign in</h2>
        <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
      </div>
    </div>
  );
};

export default Login;