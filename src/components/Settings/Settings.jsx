import React from 'react';

import ProfileEditForm from './ProfileEditForm/ProfileEditForm';

import './Settings.scss'

const Settings = ({ profile, savePhoto, onSubmit }) => {

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }

  return (
    <div className="settings-page">
      {profile && <ProfileEditForm initialValues={profile} profile={profile} onSubmit={onSubmit} />}
      <div className="settings-page__profile-imageChange">
        <h3>Change you profile photo</h3>
        <input type="file" onChange={onMainPhotoSelected} />
      </div>
    </div>
  );
};

export default Settings;