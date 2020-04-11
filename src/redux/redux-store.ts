import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import profileReducer from './reducers/profileReducer'
import dialogsReducer from './reducers/dialogsReducer'
import usersReducer from './reducers/usersReducer'
import authReducer from './reducers/authReducer'
import appReducer from './reducers/appReducer'

type TRootReducer = typeof rootReducer
export type TAppState = ReturnType<TRootReducer>



const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  app: appReducer,
  auth: authReducer,
  form: formReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.store = store



export default store