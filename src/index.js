import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import store from './redux/redux-store';

import './index.scss';


const rerenderEntireTree = (state) => {
  ReactDOM.render(
    <Router>
      <App state={state} dispatch={store.dispatch.bind(store)} />
    </Router>, document.getElementById('root'));
}



rerenderEntireTree(store.getState());
store.subscribe(() => {
  rerenderEntireTree(store.getState());
});











