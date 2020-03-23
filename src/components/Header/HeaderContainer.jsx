import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logoutTC } from '../../redux/reducers/authReducer';
import Header from './Header';

class HeaderContainer extends Component {

  render() {
    return (
      <Header userId={this.props.userId} email={this.props.email} login={this.props.login} isAuth={this.props.isAuth} isFetching={this.props.isFetching} logout={this.props.logoutTC} />
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
  logoutTC
})(HeaderContainer);