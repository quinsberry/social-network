import { WSStatus } from '@store/reducers/chatReducer'

export enum WSEvents {
  messagesReceived = 'messages-received',
  statusChanged = 'status-changed',
}

let subscribers = {
  [WSEvents.messagesReceived]: [] as IMessagesReceivedSubscriber[],
  [WSEvents.statusChanged]: [] as IStatusChangedSubscriber[],
}

let ws: WebSocket

const handleWsChannelClose = () => {
  notifySubscribersAboutStatus(WSStatus.pending)
  setTimeout(createChannel, 3000)
}

const handleWsMessage = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers[WSEvents.messagesReceived].forEach((s) => s(newMessages))
}

const handleWsOpen = () => {
  notifySubscribersAboutStatus(WSStatus.ready)
}

const handleWsError = () => {
  notifySubscribersAboutStatus(WSStatus.error)
  console.error('REFRESH PAGE')
}

const cleanUp = () => {
  ws?.removeEventListener('close', handleWsChannelClose)
  ws?.removeEventListener('message', handleWsMessage)
  ws?.removeEventListener('open', handleWsOpen)
  ws?.removeEventListener('error', handleWsError)
}

const notifySubscribersAboutStatus = (status: WSStatus) => {
  subscribers[WSEvents.statusChanged].forEach((s) => s(status))
}

const createChannel = () => {
  cleanUp()
  ws?.close()

  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifySubscribersAboutStatus(WSStatus.pending)
  ws.addEventListener('close', handleWsChannelClose)
  ws.addEventListener('message', handleWsMessage)
  ws.addEventListener('open', handleWsOpen)
  ws.addEventListener('error', handleWsError)
}

export const chatAPI = {
  start() {
    createChannel()
  },
  stop() {
    subscribers[WSEvents.messagesReceived] = []
    subscribers[WSEvents.statusChanged] = []
    cleanUp()
    ws?.close()
  },
  subscribe(eventName: WSEvents, callback: IMessagesReceivedSubscriber | IStatusChangedSubscriber) {
    // @ts-ignore
    subscribers[eventName].push(callback)
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback)
    }
  },
  unsubscribe(
    eventName: WSEvents,
    callback: IMessagesReceivedSubscriber | IStatusChangedSubscriber,
  ) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback)
  },

  sendMessage(message: string) {
    ws?.send(message)
  },
}

type IMessagesReceivedSubscriber = (messages: IChatMessageAPI[]) => void
type IStatusChangedSubscriber = (status: WSStatus) => void

export interface IChatMessageAPI {
  message: string
  photo: string
  userId: number
  username: string
}
