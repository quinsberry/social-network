import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import store from './redux/store';

import './index.scss';


const rerenderEntireTree = () => {
  ReactDOM.render(
    <Router>
      <App state={store.getState()} addPost={store.addPost.bind(store)} sendMessage={store.sendMessage.bind(store)} />
    </Router>, document.getElementById('root'));
}



rerenderEntireTree(store.getState());
store.subscribe(rerenderEntireTree);











