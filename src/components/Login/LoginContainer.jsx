import React from 'react';
import { connect } from 'react-redux';


import { loginTC } from '../../redux/reducers/authReducer';
import { getIsAuth, getCaptchaUrl } from '../../redux/selectors/authSelectors';
import Login from './Login';

const LoginContainer = (props) => {

  const onSubmit = (formData) => {
    const { email, password, rememberMe, captcha } = formData;
    props.loginTC(email, password, rememberMe, captcha);
  }

  return (
    <Login onSubmit={onSubmit} isAuth={props.isAuth} captchaUrl={props.captchaUrl} />
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: getIsAuth(state),
    captchaUrl: getCaptchaUrl(state)
  }
}

export default connect(mapStateToProps, {
  loginTC
})(LoginContainer);