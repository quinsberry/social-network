import React from 'react';

import './Post.scss';

const Post = ({ postMsg, likesCount }) => {
  return (
    <div className="post">
      <div className="post__message">
        {postMsg}
      </div>
      <div className="likes">
        Like <span>{likesCount}</span>
      </div>
    </div>
  );
};

export default Post;