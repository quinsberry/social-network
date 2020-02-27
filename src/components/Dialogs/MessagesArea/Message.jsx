import React from 'react';

import './Message.scss';

const MessagesArea = ({ message }) => {
  return (
    <div className="message">{message}</div>
  );
};

export default MessagesArea;