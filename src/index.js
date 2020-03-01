import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import store from './redux/redux-store';

import './index.scss';


const rerenderEntireTree = () => {
  ReactDOM.render(
    <Router>
      <App store={store} />
    </Router>, document.getElementById('root'));
}



rerenderEntireTree();
store.subscribe(() => {
  rerenderEntireTree();
});











