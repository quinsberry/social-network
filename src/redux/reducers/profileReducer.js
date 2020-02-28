const ADD_POST = 'ADD-POST';

const profileReducer = (state, action) => {
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