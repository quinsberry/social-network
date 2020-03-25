import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUserProfileTC, getUserProfileStatusTC, updateUserProfileStatusTC } from '../../redux/reducers/profileReducer';
import { getStatus, getProfile, getPosts, getAuthorizedUserId, getIsFetching } from '../../redux/selectors/profileSelectors';
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
    profile: getProfile(state),
    posts: getPosts(state),
    status: getStatus(state),
    authorizedUserId: getAuthorizedUserId(state),
    isFetching: getIsFetching(state)
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