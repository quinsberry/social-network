import React from 'react'

import './Post.scss'
import authorFace from '@assets/face.jpg'

type Props = {
  postMsg: string
  likesCount: number
}

const Post: React.FC<Props> = ({ postMsg, likesCount }) => {
  return (
    <div className="post">
      <div className="post__author">
        <img src={authorFace} alt="author face img" />
      </div>
      <div className="post__description">
        <div className="post__description-message">{postMsg}</div>
        <div className="post__description-likes">
          Like <span>{likesCount}</span>
        </div>
      </div>
    </div>
  )
}

export default Post
