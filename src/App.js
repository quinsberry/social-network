import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ErrorPage from './components/ErrorPage/ErrorPage';

import './App.scss';

const App = () => {

  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <Navbar />
      <div className="content">
        <Switch>
          <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
          <Route path='/dialogs' render={() => <DialogsContainer />} />
          <Route path='/users' render={() => <UsersContainer />} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </div>
  );
}




export default App;