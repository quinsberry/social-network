import React from 'react';
import { connect } from 'react-redux';


import { loginTC } from '../../redux/reducers/authReducer';
import Login from './Login';

const LoginContainer = (props) => {

  const onSubmit = (formData) => {
    const { email, password, rememberMe } = formData;
    props.loginTC(email, password, rememberMe);
  }

  return (
    <Login onSubmit={onSubmit} isAuth={props.isAuth} />
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default connect(mapStateToProps, {
  loginTC
})(LoginContainer);