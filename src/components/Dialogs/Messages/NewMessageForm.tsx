import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

import { TNewMessageFormValue } from '../../../types/types'

type Props = {}


const NewMessageForm: React.FC<InjectedFormProps<TNewMessageFormValue> & Props> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="new-message">
      <Field name={'newMessage'} rows='1' placeholder="Tape a message.." className="textarea" component="textarea" />
      <div className="new-message__buttons">
        <button className="btn">Send</button>
      </div>
    </form>
  )
}

const NewMessageReduxForm = reduxForm<TNewMessageFormValue, Props>({
  form: 'newMessage'
})(NewMessageForm)

export default NewMessageReduxForm