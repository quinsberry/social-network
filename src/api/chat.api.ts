let subscribers = [] as ISubscriber[]

let ws: WebSocket

const handleWsChannelClose = () => {
  setTimeout(createChannel, 3000)
}
const handleWsMessage = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers.forEach((s) => s(newMessages))
}

const createChannel = () => {
  ws?.removeEventListener('close', handleWsChannelClose)
  ws?.close()

  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  ws.addEventListener('close', handleWsChannelClose)
  ws.addEventListener('message', handleWsMessage)
}

export const chatAPI = {
  start() {
    createChannel()
  },
  stop() {
    subscribers = []
    ws?.removeEventListener('close', handleWsChannelClose)
    ws?.removeEventListener('message', handleWsMessage)
    ws?.close()
  },
  subscribe(callback: ISubscriber) {
    subscribers.push(callback)
    return () => {
      subscribers = subscribers.filter((s) => s !== callback)
    }
  },
  unsubscribe(callback: ISubscriber) {
    subscribers = subscribers.filter((s) => s !== callback)
  },

  sendMessage(message: string) {
    ws?.send(message)
  },
}

type ISubscriber = (messages: IChatMessage[]) => void

export interface IChatMessage {
  message: string
  photo: string
  userId: number
  username: string
}
