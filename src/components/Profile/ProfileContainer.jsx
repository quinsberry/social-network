import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { getProfileTC } from '../../redux/reducers/profileReducer';
import Profile from './Profile';


class ProfileContainer extends Component {

  componentDidMount() {
    this.props.getProfileTC(this.props.match.params.userId);
  }





  render() {

    if (!this.props.isAuth) {
      return (
        <Redirect to='/login' />
      )
    }

    return (
      <Profile {...this.props} />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    isFetching: state.profilePage.isFetching,
    isAuth: state.auth.isAuth
  }
}

const WithUrlData = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
  getProfileTC
})(WithUrlData);