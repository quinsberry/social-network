import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import ErrorPage from './components/ErrorPage/ErrorPage';

import './App.scss';

const App = ({ state, addPost, sendMessage }) => {

  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className="content">
        <Switch>
          <Route path='/profile' render={() => <Profile state={state.profilePage} addPost={addPost} />} />
          <Route path='/dialogs' render={() => <Dialogs state={state.dialogsPage} sendMessage={sendMessage} />} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </div>
  );
}




export default App;