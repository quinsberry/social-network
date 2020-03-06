import React, { Component } from 'react';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { setAuthUserData, setIsFetchingToggle } from '../../redux/reducers/authReducer';


import Header from './Header';

class HeaderContainer extends Component {

  API_PATH = 'https://social-network.samuraijs.com/api/1.0';
  componentDidMount() {
    console.log(this.props.isAuth);
    if (this.props.isAuth !== true) {
      this.props.setIsFetchingToggle(true);
      axios
        .get(`${this.API_PATH}/auth/me`, {
          withCredentials: true
        })
        .then(res => {
          if (res.data.resultCode === 0) {
            const { id, email, login } = res.data.data;
            this.props.setAuthUserData(id, email, login);
            this.props.setIsFetchingToggle(false);
          }
        });
    }
  }

  render() {
    return (
      <Header userId={this.props.userId} email={this.props.email} login={this.props.login} isAuth={this.props.isAuth} isFetching={this.props.isFetching} />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    email: state.auth.email,
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching
  }
}



export default connect(mapStateToProps, {
  setAuthUserData,
  setIsFetchingToggle
})(HeaderContainer);