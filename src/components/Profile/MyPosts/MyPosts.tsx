import React from 'react'
import { connect } from 'react-redux'

import Post from './Post/Post'
import NewPostForm from './NewPostForm'
import { addPost } from '../../../redux/reducers/profileReducer'

import './MyPosts.scss'

import { TAppState, TPost } from '../../../types/types'

type TMapState = {
  posts: Array<TPost>
}

type TMapDispatch = {
  addPost: (newPost: string) => void
}

type Props = TMapState & TMapDispatch

const MyPosts: React.FC<Props> = ({ posts, addPost }) => {
  const addNewPost = (formData: any) => {
    const { newPost } = formData
    addPost(newPost)
  }

  return (
    <div className="myposts">
      <h3>My posts</h3>
      <NewPostForm onSubmit={addNewPost} />
      {posts && (
        posts.map((post, index) => (
          <Post key={index} postMsg={post.postMessage} likesCount={post.likes} />
        ))
      )}
    </div>
  )
}

const mapStateToProps = (state: TAppState): TMapState => {
  return {
    posts: state.profilePage.posts
  }
}

export default connect<TMapState, TMapDispatch, {}, TAppState>(mapStateToProps, {
  addPost
})(MyPosts)





