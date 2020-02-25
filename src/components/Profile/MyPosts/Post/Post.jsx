import React from 'react';

import './Post.scss';

const Post = ({ msg, likesCount }) => {
  return (
    <div className="post">
      <div className="post__message">
        {msg}
      </div>
      <div className="likes">
        Like <span>{likesCount}</span>
      </div>
    </div>
  );
};

export default Post;