import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Header from './Header'
import { logoutTC } from '../../redux/reducers/authReducer'

import { TAppState, TDataProcessing } from '../../types/types'



type TMapDispatch = {
  logoutTC: () => void
}

type TMapState = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  dataProcessing: TDataProcessing
}

type Props = TMapState & TMapDispatch

class HeaderContainer extends PureComponent<Props> {

  isDataProcessing(data: TDataProcessing): boolean {
    return Object.values(data).some(item => item === true);
  }

  render() {
    return (
      <Header userId={this.props.userId} email={this.props.email} login={this.props.login} isAuth={this.props.isAuth} logout={this.props.logoutTC} isDataProcessing={this.isDataProcessing} dataProcessing={this.props.dataProcessing} />
    )
  }
}

const mapStateToProps = (state: TAppState) => {
  return {
    userId: state.auth.userId,
    email: state.auth.email,
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    dataProcessing: {
      isFetchingAuth: state.auth.isFetching,
      isProcessing: state.profilePage.isProcessing,
      lazyLoading: state.app.lazyLoading,
      isFetchingUsers: state.usersPage.isFetching,
      isFetchingProfile: state.profilePage.isFetching
    }
  }
}



export default connect<TMapState, TMapDispatch, {}, TAppState>(mapStateToProps, {
  logoutTC
})(HeaderContainer)