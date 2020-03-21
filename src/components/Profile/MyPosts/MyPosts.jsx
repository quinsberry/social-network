import React from 'react';

import Post from './Post/Post';
import NewPostForm from './NewPostForm';

import './MyPosts.scss';

const MyPosts = ({ posts, addPost }) => {


  const addNewPost = (formData) => {
    addPost(formData.newPost);
  }

  return (
    <div className="myposts">
      <h3>My posts</h3>
      <NewPostForm onSubmit={addNewPost} />
      {posts && (
        posts.map((post, index) => (
          <Post key={index} postMsg={post.postMessage} id={post.id} likesCount={post.likes} />
        ))
      )}
    </div>
  );
};

export default MyPosts;