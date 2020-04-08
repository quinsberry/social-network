import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getUserProfileTC, savePhotoTC, saveProfileTC } from '../../redux/reducers/profileReducer';
import { getProfile, getIsFetching } from '../../redux/selectors/profileSelectors';
import { getUserId } from '../../redux/selectors/authSelectors';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import Settings from './Settings';


class SettingsContainer extends Component {

  componentDidMount() {
    this.props.getUserProfileTC(this.props.userId);
  }

  onSubmit = (formData) => {
    this.props.saveProfileTC(formData);
  }

  render() {

    return (
      <Settings profile={this.props.profile} savePhoto={this.props.savePhotoTC} onSubmit={this.onSubmit} />
    );
  }
};


const mapStateToProps = (state) => {
  return {
    profile: getProfile(state),
    isFetching: getIsFetching(state),
    userId: getUserId(state)
  }
}



export default compose(
  connect(mapStateToProps, {
    getUserProfileTC,
    savePhotoTC,
    saveProfileTC
  }),
  withAuthRedirect
)(SettingsContainer);