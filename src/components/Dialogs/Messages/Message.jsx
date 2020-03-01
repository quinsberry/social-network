import React from 'react';

import './Message.scss';

const Message = ({ message }) => {
  return (
    <div className="message">{message}</div>
  );
};

export default Message;