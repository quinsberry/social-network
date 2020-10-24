import React, { lazy, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import HeaderContainer from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar'
import ProfileContainer from './components/Profile/ProfileContainer'
import ErrorPage from './components/ErrorPage/ErrorPage'
import LoginContainer from './components/Login/LoginContainer'
import { initializeApp } from './store/reducers/appReducer'
import { withSuspense } from './hoc/withSuspense'

import './App.scss'

import { TAppState } from './types/types'

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'))
const SettingsContainer = lazy(() => import('./components/Settings/SettingsContainer'))

interface SelectorProps {
  initialized: boolean
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedUsers = withSuspense(UsersContainer)
const SuspendedSettings = withSuspense(SettingsContainer)

const App: React.FC = () => {
  const dispatch = useDispatch()
  const { initialized } = useSelector<TAppState, SelectorProps>((state) => ({
    initialized: state.app.initialized,
  }))
  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!initialized) {
    return null
  }

  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path="/" render={() => <Redirect to={'/profile'} />} />
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/dialogs" render={() => <SuspendedDialogs />} />
          <Route path="/users" render={() => <SuspendedUsers />} />
          <Route path="/login" render={() => <LoginContainer />} />
          <Route path="/settings" render={() => <SuspendedSettings />} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(App)
