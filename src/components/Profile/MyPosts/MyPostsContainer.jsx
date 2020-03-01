import { connect } from 'react-redux';

import MyPosts from './MyPosts';
import { addPostActionCreactor } from '../../../redux/reducers/profileReducer';


const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (postText) => {
      dispatch(addPostActionCreactor(postText));
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;