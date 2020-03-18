import React from 'react';
import { Redirect } from 'react-router-dom';

import Dialog from './Dialog/Dialog';
import Message from './Messages/Message';
import NewMessageForm from './Messages/NewMessageForm';

import './Dialogs.scss';

const Dialogs = ({ state, sendMessage, isAuth }) => {

  const sendNewMessage = (formData) => {
    console.log(formData);
    sendMessage(formData.newMessage);
  }

  if (!isAuth) {
    return (
      <Redirect to='/login' />
    )
  }

  return (
    <div className="dialogs">
      <div className="dialogs__users">
        {state.dialogs && (
          state.dialogs.map(user => (
            <Dialog key={user.id} name={user.name} id={user.id} />
          ))
        )}
      </div>
      <div className="dialogs__messages-area">
        <div className="messages">
          {state.messages && (
            state.messages.map(message => (
              <Message key={message.id} message={message.message} id={message.id} />
            ))
          )}
        </div>
        <NewMessageForm sendMessage={sendMessage} onSubmit={sendNewMessage} />
      </div>
    </div>
  );
};

export default Dialogs;