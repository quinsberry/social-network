import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUserProfileTC, getUserProfileStatusTC, updateUserProfileStatusTC } from '../../redux/reducers/profileReducer';
import Profile from './Profile';


class ProfileContainer extends Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push('/login');
      }
    }
    this.props.getUserProfileTC(userId);
    this.props.getUserProfileStatusTC(userId);
  }


  render() {

    return (
      <Profile {...this.props} updateStatus={this.props.updateUserProfileStatusTC} />
    );
  }
};


const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isFetching: state.profilePage.isFetching
  }
}



export default compose(
  connect(mapStateToProps, {
    getUserProfileTC,
    getUserProfileStatusTC,
    updateUserProfileStatusTC
  }),
  withRouter,
)(ProfileContainer);