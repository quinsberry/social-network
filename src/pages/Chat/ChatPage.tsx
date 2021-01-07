import React, { useEffect, useState } from 'react'

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export interface IChatMessage {
  message: string
  photo: string
  userId: number
  username: string
}

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
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  )
}

interface MessagesProps {}
export const Messages: React.FC<MessagesProps> = (): React.ReactElement => {
  const [messages, setMessages] = useState<IChatMessage[]>([])
  useEffect(() => {
    ws.addEventListener('message', (e) => {
      setMessages((prev) => [...prev, ...JSON.parse(e.data)])
    })
  }, [])
  return (
    <div style={{ height: 400, overflowY: 'auto' }}>
      {messages.map((m, idx) => (
        <Message key={`${idx}-${m.userId}`} photoUrl={m.photo} author={m.username} text={m.message} />
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

interface AddMessageFormProps {}
export const AddMessageForm: React.FC<AddMessageFormProps> = (): React.ReactElement => {
  const [message, setMessage] = useState('')
  const sendMessage = () => {
    if (!message) return

    ws.send(message)
    setMessage('')
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.currentTarget.value)
  return (
    <div>
      <div>
        <textarea onChange={handleTextareaChange} value={message}></textarea>
      </div>
      <div>
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  )
}

export default ChatPage
