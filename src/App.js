import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ErrorPage from './components/ErrorPage/ErrorPage';

import './App.scss';

const App = () => {

  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className="content">
        <Switch>
          <Route path='/profile' render={() => <Profile />} />
          <Route path='/dialogs' render={() => <DialogsContainer />} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </div>
  );
}




export default App;