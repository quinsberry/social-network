import React from 'react';

import LoginForm from './LoginForm';

import './Login.scss';


const Login = () => {

  const onSubmit = (formData) => {
    console.log(formData);
  }

  return (
    <div className="login">
      <div className="login__form">
        <h2>Sign in</h2>
        <LoginForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Login;