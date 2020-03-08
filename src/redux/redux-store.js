import { createStore, combineReducers, applyMiddleware } from 'redux';
import profileReducer from './reducers/profileReducer';
import dialogsReducer from './reducers/dialogsReducer';
import usersReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

window.store = store;



export default store;