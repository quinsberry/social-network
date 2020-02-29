const ADD_POST = 'ADD-POST';

const initialState = {
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
  ]
};



const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        postMessage: action.newPostText,
        likes: 0
      };
      state.posts.push(newPost);
      return state;
    default:
      return state;
  }
}

export const addPostActionCreactor = (newPostText) => {
  return {
    type: ADD_POST,
    newPostText
  }
}

export default profileReducer;