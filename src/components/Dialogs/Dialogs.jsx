import React, { useState } from 'react';

import Dialog from './Dialog/Dialog';
import Message from './MessagesArea/Message';
import { sendMessageActionCreactor } from '../../redux/store';

import './Dialogs.scss';

const Dialogs = ({ state, dispatch }) => {

  const [newMessageText, setNewMessageText] = useState('');

  const sendingMessage = () => {
    if (newMessageText) {
      dispatch(sendMessageActionCreactor(newMessageText));
      setNewMessageText('');
    }
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
        <div className="new-message">
          <textarea rows="1" onChange={e => setNewMessageText(e.target.value)} placeholder="Tape a message.." className="textarea" value={newMessageText}></textarea>
          <div className="new-message__buttons">
            <button onClick={sendingMessage} className="btn">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;