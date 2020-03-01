import React, { useState } from 'react';

import Post from './Post/Post';

import './MyPosts.scss';

const MyPosts = ({ posts, addPost }) => {

  const [newPostText, setNewPostText] = useState('');

  const addPosts = () => {
    if (newPostText) {
      addPost(newPostText);
      setNewPostText('');
    }
  }

  return (
    <div className="myposts">
      <h3>My posts</h3>
      <div className="myposts__new-post">
        <div className="myposts__new-post-area">
          <textarea onChange={(e) => setNewPostText(e.target.value)} className="textarea" placeholder="Write a new post.." rows="3" value={newPostText} />
        </div>
        <div className="myposts__new-post-btn">
          <button onClick={addPosts} className="btn">Add Post</button>
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