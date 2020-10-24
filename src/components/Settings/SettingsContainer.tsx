import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { getUserProfileTC, savePhotoTC, saveProfileTC } from '../../store/reducers/profileReducer'
import { getProfile, getIsFetching } from '../../store/selectors/profileSelectors'
import { getUserId } from '../../store/selectors/authSelectors'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import Settings from './Settings'

import { TAppState, TProfile, TProfileEditFormValue } from '../../types/types'

type TMapState = {
  profile: TProfile | null
  isFetching: boolean
  userId: number | null
}

type TMapDispatch = {
  getUserProfileTC: (userId: number | null) => void
  savePhotoTC: (file: File) => void
  saveProfileTC: (data: TProfileEditFormValue) => void
}

type Props = TMapState & TMapDispatch

class SettingsContainer extends Component<Props> {
  componentDidMount() {
    this.props.userId && this.props.getUserProfileTC(this.props.userId)
  }

  onSubmit = (formData: TProfileEditFormValue) => {
    this.props.saveProfileTC(formData)
  }

  render() {
    return (
      <Settings
        profile={this.props.profile}
        savePhoto={this.props.savePhotoTC}
        onSubmit={this.onSubmit}
      />
    )
  }
}

const mapStateToProps = (state: TAppState): TMapState => {
  return {
    profile: getProfile(state),
    isFetching: getIsFetching(state),
    userId: getUserId(state),
  }
}

export default compose<React.ComponentType>(
  connect<TMapState, TMapDispatch, {}, TAppState>(mapStateToProps, {
    getUserProfileTC,
    savePhotoTC,
    saveProfileTC,
  }),
  withAuthRedirect,
)(SettingsContainer)
