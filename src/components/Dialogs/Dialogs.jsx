import React from 'react';

import Dialog from './Dialog/Dialog';
import Message from './Message/Message';

import './Dialogs.scss';

const Dialogs = () => {
  return (
    <div className="dialogs">
      <div className="dialogs__users">
        <Dialog name='Alicja' id='1' />
        <Dialog name='John' id='2' />
        <Dialog name='Bill' id='3' />
        <Dialog name='Evelyn' id='4' />
        <Dialog name='Kaas' id='5' />

      </div>
      <div className="dialogs__messages">
        <Message message='Hello!' />
        <Message message='How are you? go to swim' />
        <Message message='asdjwefnskdnv' />
        <Message message='Lorem ipsum' />
        <Message message='if you read this you are dumb' />
      </div>
    </div>
  );
};

export default Dialogs;