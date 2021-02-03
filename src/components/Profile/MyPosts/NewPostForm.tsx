import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

import { Textarea } from '@components/common/FormsControls/FormsControls'
import { required, maxLength } from '@utils/validators'

import { TNewPostFormValue } from '@typings/types'

const maxLength300 = maxLength(300)

type Props = {}

const NewPostForm: React.FC<InjectedFormProps<TNewPostFormValue> & Props> = ({ handleSubmit }) => {
  return (
    <form className="myposts__new-post" onSubmit={handleSubmit}>
      <div className="myposts__new-post-area">
        <Field
          name="newPost"
          component={Textarea}
          className="textarea"
          placeholder="Write a new post.."
          rows="3"
          validate={[required, maxLength300]}
        />
      </div>
      <div className="myposts__new-post-btn">
        <button className="btn">Add Post</button>
      </div>
    </form>
  )
}

const NewPostReduxForm = reduxForm<TNewPostFormValue, Props>({
  form: 'newPost',
})(NewPostForm)

export default NewPostReduxForm
