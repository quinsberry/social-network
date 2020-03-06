import { createStore, combineReducers } from 'redux';
import profileReducer from './reducers/profileReducer';
import dialogsReducer from './reducers/dialogsReducer';
import usersReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.store = store;



export default store;