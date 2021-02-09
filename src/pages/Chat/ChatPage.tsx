import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useTypedSelector } from '@hooks/useTypedSelector'

import {
  startMessagesListening,
  stopMessagesListening,
  sendMessage,
  WSStatus,
} from '@store/reducers/chatReducer'

interface ChatPageProps {}
export const ChatPage: React.FC<ChatPageProps> = (): React.ReactElement => {
  return (
    <div>
      <Chat />
    </div>
  )
}

interface ChatProps {}
export const Chat: React.FC<ChatProps> = (): React.ReactElement => {
  const dispatch = useDispatch()

  const status = useTypedSelector((state) => state.chat.status)

  useEffect(() => {
    dispatch(startMessagesListening())

    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      {status === WSStatus.error ? <div>Error. Please refresh page</div> : undefined}
      <Messages />
      <AddMessageForm />
    </div>
  )
}

interface MessagesProps {}
export const Messages: React.FC<MessagesProps> = (): React.ReactElement => {
  const messages = useTypedSelector((state) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [autoScrollIsActive, setAutoScrollIsActive] = useState(true)

  useEffect(() => {
    if (autoScrollIsActive) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleOnScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const el = e.currentTarget
    if (Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 50) {
      !autoScrollIsActive && setAutoScrollIsActive(true)
    } else {
      autoScrollIsActive && setAutoScrollIsActive(false)
    }
  }

  return (
    <div style={{ height: 400, overflowY: 'auto' }} onScroll={handleOnScroll}>
      {messages.map((m) => (
        <Message key={m.id} photoUrl={m.photo} author={m.username} text={m.message} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  )
}

interface MessageProps {
  photoUrl: string
  author: string
  text: string
}
export const Message: React.FC<MessageProps> = React.memo(
  ({ photoUrl, author, text }): React.ReactElement => {
    console.log('aa')
    return (
      <div>
        <img style={{ width: 30 }} src={photoUrl} alt="Message img" />
        <b>{author}</b>
        <br />
        {text}
        <hr />
      </div>
    )
  },
)

interface AddMessageFormProps {}
export const AddMessageForm: React.FC<AddMessageFormProps> = (): React.ReactElement => {
  const dispatch = useDispatch()

  const [message, setMessage] = useState('')

  const status = useTypedSelector((state) => state.chat.status)

  const handleSend = () => {
    if (message.length > 0) {
      dispatch(sendMessage(message))
      setMessage('')
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
        <button disabled={status !== WSStatus.ready} onClick={handleSend}>
          send
        </button>
      </div>
    </div>
  )
}

export default ChatPage
