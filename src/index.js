import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import state, { addPost, sendMessage, subscribe } from './redux/store';

import './index.scss';


const rerenderEntireTree = (stateData) => {
  ReactDOM.render(
    <Router>
      <App state={stateData} addPost={addPost} sendMessage={sendMessage} />
    </Router>, document.getElementById('root'));
}


subscribe(rerenderEntireTree);





rerenderEntireTree(state);






