import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Textarea } from '../../common//FormsControls/FormsControls';
import { validDomain } from '../../../utils/validators';

import github from '../../../assets/icons/github.svg';
import vk from '../../../assets/icons/vk.svg';
import facebook from '../../../assets/icons/facebook.svg';
import instagram from '../../../assets/icons/instagram.svg';
import twitter from '../../../assets/icons/twitter.svg';
import website from '../../../assets/icons/website.svg';
import youtube from '../../../assets/icons/youtube.svg';
import mainLink from '../../../assets/icons/website.svg';

import './ProfileEditForm.scss';

const ProfileEditForm = ({ profile, handleSubmit, pristine, submitting }) => {

  const { aboutMe, contacts, lookingForAJobDescription, fullName } = profile;

  const icons = {
    github,
    vk,
    facebook,
    instagram,
    twitter,
    website,
    youtube,
    mainLink
  };

  //     There is a code which find the right contact value for each of inputs
  //
  // const isContactRight = (item) => {
  //   const res = Object.entries(contacts).filter(contact => contact[0] === item);
  //   return res[1];
  // }

  // Object.values(contacts).map(contact => contact !== null && contact !== '') ? isContactRight(icon[0]) :

  return (
    <form className="profile-edit-form" onSubmit={handleSubmit}>
      <div className="profile-edit-form__save">
        <h2>Profile settings</h2>
        <button type="submit" disabled={pristine || submitting} className="edit-descr-btn">save</button>
      </div>
      <div className="form-wrapper">
        <div className="profile-edit-form__username">
          <h3>Username</h3>
          <Field name="fullName" placeholder={fullName ? fullName : 'Enter you full name'} extracn={'fullName'} className="input" validate={[]} component={Input} />
        </div>
        <div className="profile-edit-form__about">
          <h3>About me</h3>
          <Field name="aboutMe" placeholder={aboutMe ? aboutMe : 'Write something about you'} extracn={'about'} className="input" validate={[]} component={Input} />
        </div>
        <ul className="profile-edit-form__contacts">
          <h3>Links you can find me where:</h3>
          {Object.entries(icons).map((icon, index) => {
            return (
              <li key={index} className="profile-edit-form__contacts-item">
                <img src={icon[1]} alt={`${icon[0]} icon`} />
                <Field name={`contacts.${icon[0]}`} placeholder={`Enter your ${icon[0]} link`} extracn={`contacts`} className="input" validate={[validDomain]} component={Input} />
              </li>
            )
          })}
        </ul>
        <div className="profile-edit-form__lookingForAJob">
          <h3>Looking for a job</h3>
          <div className="profile-edit-form__lookingForAJob__isLooking">
            <h5>Are you looking a job?</h5>
            <Field name={'lookingForAJob'} extracn={'lookingForAJob'} className="input" validate={[]} component={Input} type="checkbox" />
          </div>
          <div className="profile-edit-form__lookingForAJob__isLooking-descr">
            <h5>Describe you proffesional skills</h5>
            <Field name={'lookingForAJobDescription'} placeholder={lookingForAJobDescription ? lookingForAJobDescription : 'Write it here'} extracn={'lookingForAJob-descr'} className="textarea" validate={[]} component={Textarea} />
          </div>
        </div>
      </div>
    </form>
  );
};


const ProfileEditFormReduxForm = reduxForm({
  form: 'editProfile',
  enableReinitialize: true
})(ProfileEditForm);

export default ProfileEditFormReduxForm;