import React from 'react';
import { Field, reduxForm } from 'redux-form';


const NewMessageForm = ({ handleSubmit }) => {

  return (
    <form action="" onSubmit={handleSubmit} className="new-message">
      <Field name={'newMessage'} rows='1' placeholder="Tape a message.." className="textarea" component="textarea" />
      <div className="new-message__buttons">
        <button className="btn">Send</button>
      </div>
    </form>
  );
};

const NewMessageReduxForm = reduxForm({
  form: 'newMessage'
})(NewMessageForm)

export default NewMessageReduxForm;