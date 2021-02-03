import { stopSubmit, FormAction } from 'redux-form'

import { authAPI } from '@api/auth-api'
import { securityAPI } from '@api/security-api'

import { TBaseThunk, TInferActions, ResultCodes } from '@typings/types'
import { chatAPI, IChatMessage } from '@api/chat.api'
import { Dispatch } from 'redux'

type TInitialState = typeof initialState

const initialState = {
  messages: [] as IChatMessage[],
}

export const chatReducer = (state = initialState, action: TActions): TInitialState => {
  switch (action.type) {
    case 'CHAT/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      }
    default:
      return state
  }
}

type TActions = TInferActions<typeof actions>

export const actions = {
  messagesReceived: (messages: IChatMessage[]) =>
    ({ type: 'CHAT/MESSAGES_RECEIVED', payload: messages } as const),
}

type TThunk = TBaseThunk<TActions | FormAction>

let _newMessageHandler: ((messages: IChatMessage[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages: IChatMessage[]) => {
      dispatch(actions.messagesReceived(messages))
    }
  }

  return _newMessageHandler
}

export const startMessagesListening = (): TThunk => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): TThunk => async (dispatch) => {
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
}

export const sendMessage = (message: string): TThunk => async (dispatch) => {
  chatAPI.sendMessage(message)
}
