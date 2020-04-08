import React, { Component, lazy } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import ErrorPage from './components/ErrorPage/ErrorPage';
import LoginContainer from './components/Login/LoginContainer';
import { initializeApp } from './redux/reducers/appReducer';
import { withSuspense } from './hoc/withSuspense';

import './App.scss';

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
const SettingsContainer = lazy(() => import('./components/Settings/SettingsContainer'));


class App extends Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return (
        null
      );
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className="content">
          <Switch>
            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
            <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
            <Route path='/users' render={withSuspense(UsersContainer)} />
            <Route path='/login' render={() => <LoginContainer />} />
            <Route path='/settings' render={withSuspense(SettingsContainer)} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}


export default compose(
  withRouter,
  connect(mapStateToProps, {
    initializeApp
  })

)(App);


