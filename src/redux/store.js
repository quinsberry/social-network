import profileReducer from './reducers/profileReducer';
import dialogsReducer from './reducers/dialogsReducer';

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


  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },


  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

    this._callSubscriber(this._state);
  }
}




window.state = store.getState();


export default store;