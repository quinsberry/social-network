import { TBaseThunk, TInferActions, TDialog, TMessage } from '../../types/types'


type TInitialState = typeof initialState

const initialState = {
  dialogs: [
    {
      id: 1,
      name: 'Alicja'
    },
    {
      id: 2,
      name: 'John'
    },
    {
      id: 3,
      name: 'Bill'
    },
    {
      id: 4,
      name: 'Evelyn'
    },
    {
      id: 5,
      name: 'Kaas'
    },
  ] as Array<TDialog>,
  messages: [
    {
      id: 1,
      message: 'Hello!'
    },
    {
      id: 2,
      message: 'How are you? go to swim'
    },
    {
      id: 3,
      message: 'asdjwefnskdnv!'
    },
    {
      id: 4,
      message: 'Lorem ipsum'
    },
    {
      id: 5,
      message: 'if you read this you are dumb'
    },
  ] as Array<TMessage>
}

const dialogsReducer = (state = initialState, action: TActions): TInitialState => {
  switch (action.type) {
    case 'DIALOGS/SEND_MESSAGE':
      let newMessage = {
        id: 5,
        message: action.newMessageText
      };
      return {
        ...state,
        messages: [...state.messages, newMessage]
      };
    default:
      return state;
  }
}

type TActions = TInferActions<typeof actions>

export const actions = {
  sendMessage: (newMessageText: string) => ({ type: 'DIALOGS/SEND_MESSAGE', newMessageText } as const)
}

type TThunk = TBaseThunk<TActions>

export const sendMessageTC = (newMessageText: string): TThunk => {
  return async (dispatch) => {
    dispatch(actions.sendMessage(newMessageText))
  }
}


export default dialogsReducer;