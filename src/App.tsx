import React, { Component, lazy } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import HeaderContainer from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar'
import ProfileContainer from './components/Profile/ProfileContainer'
import ErrorPage from './components/ErrorPage/ErrorPage'
import LoginContainer from './components/Login/LoginContainer'
import { initializeApp } from './redux/reducers/appReducer'
import { withSuspense } from './hoc/withSuspense'

import './App.scss'

import { TAppState } from './types/types'

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'))
const SettingsContainer = lazy(() => import('./components/Settings/SettingsContainer'))


type Props = TMapState & TMapDispatch

type TMapState = ReturnType<typeof mapStateToProps>

type TMapDispatch = {
  initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedUsers = withSuspense(UsersContainer)
const SuspendedSettings = withSuspense(SettingsContainer)

class App extends Component<Props> {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return (
        null
      )
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
            <Route path='/dialogs' render={() => <SuspendedDialogs />} />
            <Route path='/users' render={() => <SuspendedUsers />} />
            <Route path='/login' render={() => <LoginContainer />} />
            <Route path='/settings' render={() => <SuspendedSettings />} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: TAppState) => {
  return {
    initialized: state.app.initialized
  }
}


export default compose<React.ComponentType>(
  withRouter,
  connect<TMapState, TMapDispatch, {}, TAppState>(mapStateToProps, {
    initializeApp
  })

)(App)


