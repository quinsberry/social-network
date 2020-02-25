import React from 'react';

import './Message.scss';

const Message = ({ message }) => {
  return (
    <div className="dialogs__messages-message">{message}</div>
  );
};

export default Message;