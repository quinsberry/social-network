import React from 'react';
import { Field, reduxForm } from 'redux-form';

const NewPostForm = ({ handleSubmit }) => {
  return (
    <form className="myposts__new-post" onSubmit={handleSubmit}>
      <div className="myposts__new-post-area">
        <Field name="newPost" component={'textarea'} className="textarea" placeholder="Write a new post.." rows="3" />
      </div>
      <div className="myposts__new-post-btn">
        <button className="btn">Add Post</button>
      </div>
    </form>
  );
};

const NewPostReduxForm = reduxForm({
  form: 'newPost'
})(NewPostForm)

export default NewPostReduxForm;