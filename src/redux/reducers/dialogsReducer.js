const SEND_MESSAGE = 'SEND-MESSAGE';

const dialogsReducer = (state, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let newMessage = {
        id: 5,
        message: action.newMessageText
      };
      state.messages.push(newMessage);
      return state;
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