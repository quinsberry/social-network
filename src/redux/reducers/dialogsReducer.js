const SEND_MESSAGE = 'SEND_MESSAGE';

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
  ],
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
  ]
}

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let newMessage = {
        id: 5,
        message: action.newMessageText
      };
      const newState = {
        ...state,
        messages: [...state.messages, newMessage],
      }
      return newState;
    default:
      return state;
  }
}

export const sendMessageActionCreactor = (newMessageText) => {
  return {
    type: SEND_MESSAGE,
    newMessageText
  }
}

export default dialogsReducer;