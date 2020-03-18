import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import profileReducer from './reducers/profileReducer';
import dialogsReducer from './reducers/dialogsReducer';
import usersReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;



export default store;