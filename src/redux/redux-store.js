import { createStore, combineReducers } from 'redux';
import profileReducer from './reducers/profileReducer';
import dialogsReducer from './reducers/dialogsReducer';
import usersReducer from './reducers/usersReducer';

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer
});

const store = createStore(rootReducer);



export default store;