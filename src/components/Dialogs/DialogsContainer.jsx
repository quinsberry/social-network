import React from 'react';

import Dialogs from './Dialogs';

import { sendMessageActionCreactor } from '../../redux/reducers/dialogsReducer';


const DialogsContainer = ({ store }) => {

  const state = store.getState();


  const sendMessage = (newMessageText) => {
    if (newMessageText) {
      store.dispatch(sendMessageActionCreactor(newMessageText));
    }
  }


  return (
    <Dialogs state={state.dialogsPage} sendMessage={sendMessage} />
  );
};

export default DialogsContainer;