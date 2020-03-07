import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserProfile, setIsFetchingToggle } from '../../redux/reducers/profileReducer';

import Profile from './Profile';
import { withRouter } from 'react-router-dom';

import { profileAPI } from '../../api/api';

class ProfileContainer extends Component {

  componentDidMount() {
    this.props.setIsFetchingToggle(true);
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }

    profileAPI.getProfile(userId)
      .then(data => {
        this.props.setUserProfile(data);
        this.props.setIsFetchingToggle(false);
      });
  }

  render() {
    return (
      <Profile {...this.props} />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    isFetching: state.profilePage.isFetching
  }
}

const WithUrlData = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
  setUserProfile,
  setIsFetchingToggle
})(WithUrlData);