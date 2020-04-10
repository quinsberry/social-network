const SEND_MESSAGE = 'dialogs/SEND_MESSAGE';

type TInitialState = typeof initialState

type TDialogs = {
  id: number,
  name: string
}

type TMessages = {
  id: number,
  message: string
}

type TSendMessage = {
  type: typeof SEND_MESSAGE
  newMessageText: string
}

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
  ] as Array<TDialogs>,
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
  ] as Array<TMessages>
}

const dialogsReducer = (state = initialState, action: any): TInitialState => {
  switch (action.type) {
    case SEND_MESSAGE:
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

export const sendMessage = (newMessageText: string): TSendMessage => {
  return {
    type: SEND_MESSAGE,
    newMessageText
  }
}

export default dialogsReducer;