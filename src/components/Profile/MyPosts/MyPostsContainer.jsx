import { connect } from 'react-redux';

import MyPosts from './MyPosts';
import { addPost } from '../../../redux/reducers/profileReducer';


const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts
  }
}

export default connect(mapStateToProps, {
  addPost
})(MyPosts);;