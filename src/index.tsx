import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from '@store/store'

import './index.scss'
import { QueryParamProvider } from 'use-query-params'

ReactDOM.render(
  <Router>
    <QueryParamProvider ReactRouterRoute={Route}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryParamProvider>
  </Router>,
  document.getElementById('root'),
)
