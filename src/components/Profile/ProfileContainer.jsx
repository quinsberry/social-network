import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUserProfileTC, getUserProfileStatusTC, updateUserProfileStatusTC } from '../../redux/reducers/profileReducer';
import Profile from './Profile';


class ProfileContainer extends Component {

  componentDidMount() {
    this.props.getUserProfileTC(this.props.match.params.userId);
    this.props.getUserProfileStatusTC(this.props.match.params.userId);
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