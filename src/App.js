import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import ErrorPage from './components/ErrorPage/ErrorPage';

import './App.scss';

const App = () => {
  return (
    <Router>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/dialogs' component={Dialogs} />
            <Route exact component={ErrorPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;