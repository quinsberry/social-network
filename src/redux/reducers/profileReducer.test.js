import profileReducer, { addPost, deletePost } from "./profileReducer";

const initialState = {
  posts: [
    {
      id: 1,
      postMessage: 'Hey everyone!!',
      likes: '0'
    },
    {
      id: 2,
      postMessage: 'Nice day.',
      likes: '5'
    },
    {
      id: 3,
      postMessage: 'Im newbee, Hello!',
      likes: '23'
    },
  ]
};



it('Length of posts should be incremented', () => {
  let action = addPost('testing new post');

  let newState = profileReducer(initialState, action);

  expect(newState.posts.length).toBe(4);
});

it('Length of posts should be decremented after deleting the post', () => {
  let action = deletePost(1);

  let newState = profileReducer(initialState, action);


  expect(newState.posts.length).toBe(2);
});

it('Length of posts should not be decremented after deleting the post', () => {
  let action = deletePost(666);

  let newState = profileReducer(initialState, action);


  expect(newState.posts.length).toBe(3);
});

it('The correct post was deleted', () => {
  const postId = 1;
  let action = deletePost(postId);

  let newState = profileReducer(initialState, action);


  expect(newState.posts.filter(p => p.id === postId).length).toBe(0);
});

