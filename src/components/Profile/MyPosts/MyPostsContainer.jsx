import React from 'react';

import MyPosts from './MyPosts';
import { addPostActionCreactor } from '../../../redux/reducers/profileReducer';

const MyPostsContainer = ({ store }) => {


  const addPost = (postText) => {
    store.dispatch(addPostActionCreactor(postText));
  }

  const state = store.getState();

  return (
    <MyPosts posts={state.profilePage.posts} addPost={addPost} />
  );
};

export default MyPostsContainer;