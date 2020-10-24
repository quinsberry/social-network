import React from 'react'

import './Message.scss'

import { TMessage } from '@typings/types'

type Props = TMessage

const Message: React.FC<Props> = ({ message, id }) => {
  return <div className="message">{message}</div>
}

export default Message
