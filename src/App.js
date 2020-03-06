import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ErrorPage from './components/ErrorPage/ErrorPage';

import './App.scss';

const App = () => {

  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className="content">
        <Switch>
          <Route path='/profile' render={() => <ProfileContainer />} />
          <Route path='/dialogs' render={() => <DialogsContainer />} />
          <Route path='/users' render={() => <UsersContainer />} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </div>
  );
}




export default App;