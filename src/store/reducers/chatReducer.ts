import { FormAction } from 'redux-form'

import { TBaseThunk, TInferActions } from '@typings/types'
import { chatAPI, IChatMessageAPI, WSEvents } from '@api/chat.api'
import { Dispatch } from 'redux'
import { v1 } from 'uuid'

type TInitialState = typeof initialState

interface IChatMessage extends IChatMessageAPI {
  id: string
}

export enum WSStatus {
  pending = 'pending',
  ready = 'ready',
  error = 'error',
}

const initialState = {
  messages: [] as IChatMessage[],
  status: WSStatus.pending as WSStatus,
}

export const chatReducer = (state = initialState, action: TActions): TInitialState => {
  switch (action.type) {
    case 'CHAT/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.map((message) => ({ ...message, id: v1() })),
        ].filter((m, i, arr) => i >= arr.length - 100),
      }
    case 'CHAT/STATUS_CHANGED':
      return {
        ...state,
        status: action.payload,
      }
    default:
      return state
  }
}

type TActions = TInferActions<typeof actions>

export const actions = {
  messagesReceived: (messages: IChatMessageAPI[]) =>
    ({ type: 'CHAT/MESSAGES_RECEIVED', payload: messages } as const),
  statusChanged: (status: WSStatus) => ({ type: 'CHAT/STATUS_CHANGED', payload: status } as const),
}

type TThunk = TBaseThunk<TActions | FormAction>

let _newMessageHandler: ((messages: IChatMessageAPI[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages: IChatMessageAPI[]) => {
      dispatch(actions.messagesReceived(messages))
    }
  }

  return _newMessageHandler
}

let _statusChangedHandler: ((status: WSStatus) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status: WSStatus) => {
      dispatch(actions.statusChanged(status))
    }
  }

  return _statusChangedHandler
}

export const startMessagesListening = (): TThunk => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe(WSEvents.messagesReceived, newMessageHandlerCreator(dispatch))
  chatAPI.subscribe(WSEvents.statusChanged, statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): TThunk => async (dispatch) => {
  chatAPI.unsubscribe(WSEvents.messagesReceived, newMessageHandlerCreator(dispatch))
  chatAPI.unsubscribe(WSEvents.statusChanged, statusChangedHandlerCreator(dispatch))
}

export const sendMessage = (message: string): TThunk => async (dispatch) => {
  chatAPI.sendMessage(message)
}
