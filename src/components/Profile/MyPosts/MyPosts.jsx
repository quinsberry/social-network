import React from 'react';

import Post from './Post/Post';

import './MyPosts.scss';

const MyPosts = () => {
  return (
    <div>
      My posts
      <div>
        <textarea name="a" id="a" rows="3"></textarea>
        <button>Add Post</button>
      </div>
      <Post msg={'Hey everyone!!'} likesCount='0' />
      <Post msg={'Im newbee, Hello!'} likesCount='23' />
    </div>
  );
};

export default MyPosts;