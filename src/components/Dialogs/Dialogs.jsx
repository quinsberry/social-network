import React from 'react';

import Dialog from './Dialog/Dialog';
import Message from './Message/Message';

import './Dialogs.scss';

const Dialogs = ({ state }) => {



  return (
    <div className="dialogs">
      <div className="dialogs__users">
        {state.dialogs && (
          state.dialogs.map(user => (
            <Dialog key={user.id} name={user.name} id={user.id} />
          ))
        )}
      </div>
      <div className="dialogs__messages">
        {state.messages && (
          state.messages.map(message => (
            <Message key={message.id} message={message.message} id={message.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dialogs;