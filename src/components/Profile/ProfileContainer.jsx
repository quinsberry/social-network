import React, { Component } from 'react';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfile, setIsFetchingToggle } from '../../redux/reducers/profileReducer';

import Profile from './Profile';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends Component {

  API_PATH = 'https://social-network.samuraijs.com/api/1.0';

  componentDidMount() {
    this.props.setIsFetchingToggle(true);
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    axios
      .get(`${this.API_PATH}/profile/${userId}`)
      .then(res => {
        this.props.setUserProfile(res.data);
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