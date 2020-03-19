import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Textarea } from '../../common/FormsControls/FormsControls';
import { required, maxLength } from '../../../utils/validators';

const maxLength10 = maxLength(10);

const NewPostForm = ({ handleSubmit }) => {
  return (
    <form className="myposts__new-post" onSubmit={handleSubmit}>
      <div className="myposts__new-post-area">
        <Field name="newPost" component={Textarea} className="textarea" placeholder="Write a new post.." rows="3" validate={[required, maxLength10]} />
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