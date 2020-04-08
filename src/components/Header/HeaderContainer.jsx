import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { logoutTC } from '../../redux/reducers/authReducer';
import Header from './Header';

class HeaderContainer extends PureComponent {

  isDataProcessing(data) {
    return Object.values(data).some(item => item === true);
  }

  render() {
    return (
      <Header userId={this.props.userId} email={this.props.email} login={this.props.login} isAuth={this.props.isAuth} isFetching={this.props.dataProcessing.isFetching} logout={this.props.logoutTC} isDataProcessing={this.isDataProcessing} dataProcessing={this.props.dataProcessing} />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    email: state.auth.email,
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    dataProcessing: {
      isFetchingAuth: state.auth.isFetching,
      isProcessing: state.profilePage.isProcessing,
      lazyLoading: state.app.lazyLoading,
      isFetchingUsers: state.usersPage.isFetching,
      isFetchingProfile: state.profilePage.isFetching
    }
  }
}



export default connect(mapStateToProps, {
  logoutTC
})(HeaderContainer);