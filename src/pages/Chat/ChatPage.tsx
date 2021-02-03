import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IChatMessage } from '@api/chat.api'
import { startMessagesListening, stopMessagesListening, sendMessage } from '@store/reducers/chatReducer'

import { TAppState } from '@typings/types'

interface ChatPageProps { }
export const ChatPage: React.FC<ChatPageProps> = (): React.ReactElement => {
  return (
    <div>
      <Chat />
    </div>
  )
}

interface ChatProps { }
export const Chat: React.FC<ChatProps> = (): React.ReactElement => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startMessagesListening())

    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  )
}

interface MessagesProps {
}
export const Messages: React.FC<MessagesProps> = (): React.ReactElement => {
  const messages = useSelector((state: TAppState) => state.chat.messages)

  return (
    <div style={{ height: 400, overflowY: 'auto' }}>
      {messages.map((m, idx) => (
        <Message
          key={`${idx}-${m.userId}`}
          photoUrl={m.photo}
          author={m.username}
          text={m.message}
        />
      ))}
    </div>
  )
}

interface MessageProps {
  photoUrl: string
  author: string
  text: string
}
export const Message: React.FC<MessageProps> = ({ photoUrl, author, text }): React.ReactElement => {
  return (
    <div>
      <img style={{ width: 30 }} src={photoUrl} alt="Message img" />
      <b>{author}</b>
      <br />
      {text}
      <hr />
    </div>
  )
}

interface AddMessageFormProps {
}
export const AddMessageForm: React.FC<AddMessageFormProps> = (): React.ReactElement => {
  const dispatch = useDispatch()

  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')


  const handleSend = () => {
    if (message.length > 0) {
      dispatch(sendMessage(message))
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMessage(e.currentTarget.value)
  return (
    <div>
      <div>
        <textarea onChange={handleTextareaChange} value={message}></textarea>
      </div>
      <div>
        <button onClick={handleSend}>
          send
        </button>
      </div>
    </div>
  )
}

export default ChatPage
