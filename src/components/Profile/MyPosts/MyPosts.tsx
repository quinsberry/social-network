import React from 'react'
import { connect } from 'react-redux'

import Post from './Post/Post'
import NewPostForm from './NewPostForm'
import { addPostTC } from '../../../store/reducers/profileReducer'

import './MyPosts.scss'

import { TAppState, TNewPostFormValue, TPost } from '../../../types/types'

type TMapState = {
  posts: Array<TPost>
}

type TMapDispatch = {
  addPostTC: (newPost: string) => void
}

type Props = TMapState & TMapDispatch

const MyPosts: React.FC<Props> = ({ posts, addPostTC }) => {
  const addNewPost = (formData: TNewPostFormValue) => {
    const { newPost } = formData
    addPostTC(newPost)
  }

  return (
    <div className="myposts">
      <h3>My posts</h3>
      <NewPostForm onSubmit={addNewPost} />
      {posts &&
        posts
          .reverse()
          .map((post, index) => (
            <Post key={index} postMsg={post.postMessage} likesCount={post.likes} />
          ))}
    </div>
  )
}

const mapStateToProps = (state: TAppState): TMapState => {
  return {
    posts: state.profilePage.posts,
  }
}

const MyPostWithConnect = connect<TMapState, TMapDispatch, {}, TAppState>(mapStateToProps, {
  addPostTC,
})(MyPosts)

export default React.memo(MyPostWithConnect)
