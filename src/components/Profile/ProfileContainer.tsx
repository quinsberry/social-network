import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { getUserProfileTC, getUserProfileStatusTC, updateUserProfileStatusTC } from '../../redux/reducers/profileReducer'
import { getStatus, getProfile, getAuthorizedUserId } from '../../redux/selectors/profileSelectors'
import Profile from './Profile'

import { TAppState, TProfile } from '../../types/types'

type TMapState = {
  profile: TProfile | null
  status: string | null
  authorizedUserId: number | null
}

type TMapDispatch = {
  getUserProfileTC: (userIdNumber: number) => void
  getUserProfileStatusTC: (userIdNumber: number) => void
  updateUserProfileStatusTC: (statusText: string) => void
}

type TParams = {
  userId: string | undefined
}

type TWithRouter = RouteComponentProps<TParams>


type Props = TMapState & TMapDispatch & TWithRouter

class ProfileContainer extends PureComponent<Props> {

  refreshProfile() {
    let userIdNumber = Number(this.props.match.params.userId)
    if (!userIdNumber) {
      if (this.props.authorizedUserId) {
        userIdNumber = this.props.authorizedUserId;
      } else {
        this.props.history.push('/login')
      }

    }
    this.props.getUserProfileTC(userIdNumber);
    this.props.getUserProfileStatusTC(userIdNumber);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }


  render() {

    return (
      <Profile {...this.props} isOwner={!this.props.match.params.userId} updateStatus={this.props.updateUserProfileStatusTC} />
    )
  }
}


const mapStateToProps = (state: TAppState): TMapState => {
  return {
    profile: getProfile(state),
    status: getStatus(state),
    authorizedUserId: getAuthorizedUserId(state)
  }
}



export default compose<React.ComponentType>(
  connect<TMapState, TMapDispatch, {}, TAppState>(mapStateToProps, {
    getUserProfileTC,
    getUserProfileStatusTC,
    updateUserProfileStatusTC
  }),
  withRouter,
)(ProfileContainer)