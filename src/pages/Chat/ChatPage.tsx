import React, { useEffect, useState } from 'react'

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
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
  useEffect(() => {
    let ws: WebSocket

    const handleWsChannelClose = () => {
      setTimeout(createChannel, 3000)
    }

    const createChannel = () => {
      ws?.removeEventListener('close', handleWsChannelClose)
      ws?.close()

      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws.addEventListener('close', handleWsChannelClose)
      setWsChannel(ws)
    }

    createChannel()

    return () => {
      ws.removeEventListener('close', handleWsChannelClose)
      ws.close()
    }
  }, [])

  return (
    <div>
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  )
}

interface MessagesProps {
  wsChannel: WebSocket | null
}
export const Messages: React.FC<MessagesProps> = ({ wsChannel }): React.ReactElement => {
  const [messages, setMessages] = useState<IChatMessage[]>([])
  useEffect(() => {
    const handleWsMessage = (e: MessageEvent) => {
      setMessages((prev) => [...prev, ...JSON.parse(e.data)])
    }
    wsChannel?.addEventListener('message', handleWsMessage)

    return () => {
      wsChannel?.removeEventListener('message', handleWsMessage)
      wsChannel?.close()
    }
  }, [wsChannel])
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

interface AddMessageFormProps {
  wsChannel: WebSocket | null
}
export const AddMessageForm: React.FC<AddMessageFormProps> = ({ wsChannel }): React.ReactElement => {
  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
  const sendMessage = () => {
    if (!message) return

    wsChannel?.send(message)
    setMessage('')
  }

  useEffect(() => {
    const handleOpenWsChanel = () => setReadyStatus('ready')
    wsChannel?.addEventListener('open', handleOpenWsChanel)

    return () => {
      wsChannel?.removeEventListener('open', handleOpenWsChanel)
      wsChannel?.close()
    }
  }, [wsChannel])

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.currentTarget.value)
  return (
    <div>
      <div>
        <textarea onChange={handleTextareaChange} value={message}></textarea>
      </div>
      <div>
        <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>
          send
        </button>
      </div>
    </div>
  )
}

export default ChatPage
