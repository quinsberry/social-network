import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import { profileReducer } from './reducers/profileReducer'
import { dialogsReducer } from './reducers/dialogsReducer'
import { usersReducer } from './reducers/usersReducer'
import { authReducer } from './reducers/authReducer'
import { appReducer } from './reducers/appReducer'
import { chatReducer } from './reducers/chatReducer'

export type TRootReducer = typeof rootReducer

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  app: appReducer,
  auth: authReducer,
  form: formReducer,
  chat: chatReducer,
})

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
