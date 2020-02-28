const ADD_POST = 'ADD-POST';
const SEND_MESSAGE = 'SEND-MESSAGE';

const store = {
  _state: {
    profilePage: {
      posts: [
        {
          id: 1,
          postMessage: 'Hey everyone!!',
          likes: '0'
        },
        {
          id: 1,
          postMessage: 'Nice day.',
          likes: '5'
        },
        {
          id: 1,
          postMessage: 'Im newbee, Hello!',
          likes: '23'
        },
      ],
    },
    dialogsPage: {
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
  },
  _callSubscriber() {
    console.log('State changed');
  },
  _addPost(postMessage) {
    let newPost = {
      id: 5,
      postMessage: postMessage,
      likes: 0
    };
    this._state.profilePage.posts.push(newPost);
    this._callSubscriber(this._state);
  },
  _sendMessage(message) {
    let newMessage = {
      id: 5,
      message: message
    };
    this._state.dialogsPage.messages.push(newMessage);
    this._callSubscriber(this._state);
  },


  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },


  dispatch(action) {
    switch (action.type) {
      case ADD_POST:
        this._addPost(action.newPostText);
        break;
      case SEND_MESSAGE:
        this._sendMessage(action.newMessageText);
        break;
      default:
        return this._state;
    }
  }


}

export const addPostActionCreactor = (newPostText) => {
  return {
    type: ADD_POST,
    newPostText
  }
}
export const sendMessageActionCreactor = (newMessageText) => {
  return {
    type: SEND_MESSAGE,
    newMessageText
  }
}
// store.sendMessage('hi');


window.state = store.getState();


export default store;