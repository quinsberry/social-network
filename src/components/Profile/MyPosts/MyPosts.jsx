import React from 'react';

import Post from './Post/Post';

import './MyPosts.scss';

const MyPosts = ({ posts }) => {

  return (
    <div className="myposts">
      <h3>My posts</h3>
      <div className="myposts__new-post">
        <div className="myposts__new-post-area">
          <textarea name="a" id="a" rows="3"></textarea>
        </div>
        <div className="myposts__new-post-btn">
          <button className="btn">Add Post</button>
        </div>
      </div>
      {posts && (
        posts.map((post, index) => (
          <Post key={index} postMsg={post.postMessage} id={post.id} likesCount={post.likes} />
        ))
      )}
    </div>
  );
};

export default MyPosts;