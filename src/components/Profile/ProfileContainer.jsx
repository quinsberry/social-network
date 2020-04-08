import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUserProfileTC, getUserProfileStatusTC, updateUserProfileStatusTC } from '../../redux/reducers/profileReducer';
import { getStatus, getProfile, getPosts, getAuthorizedUserId } from '../../redux/selectors/profileSelectors';
import Profile from './Profile';


class ProfileContainer extends Component {

  refreshProfile() {
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

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }


  render() {

    return (
      <Profile {...this.props} isOwner={!this.props.match.params.userId} updateStatus={this.props.updateUserProfileStatusTC} />
    );
  }
};


const mapStateToProps = (state) => {
  return {
    profile: getProfile(state),
    posts: getPosts(state),
    status: getStatus(state),
    authorizedUserId: getAuthorizedUserId(state)
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