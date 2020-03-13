import React from 'react';

import ProfileStatus from './ProfileStatus';

import './ProfileInfo.scss';
import github from '../../../assets/icons/github.svg';
import vk from '../../../assets/icons/vk.svg';
import facebook from '../../../assets/icons/facebook.svg';
import instagram from '../../../assets/icons/instagram.svg';
import twitter from '../../../assets/icons/twitter.svg';
import website from '../../../assets/icons/website.svg';
import youtube from '../../../assets/icons/youtube.svg';
import userDefaultImage from '../../../assets/userphoto_default.png';

const ProfileInfo = ({ about, contacts, lookingForAJob, lookingForAJobDescr, fullName, photos, status }) => {

  const icons = {
    github,
    vk,
    facebook,
    instagram,
    twitter,
    website,
    youtube
  };

  return (
    <div className="profile-info">
      <div className="profile-info__avatar">
        <img className="profile-info__avatar-user-img" src={photos.large ? photos.large : userDefaultImage} alt="User avatar" />
        <span className="profile-info__avatar-user-job">{lookingForAJob ? 'Looking for a job' : 'Working'}</span>
        <span className="profile-info__avatar-user-job-descr">{lookingForAJobDescr}</span>
      </div>
      <div className="profile-info__description">
        <h2 className="profile-info__description-username">{fullName}</h2>
        <ProfileStatus status={status} />
        <div className="profile-info__description-about">
          <h3>About me</h3>
          <span>{about}</span>
        </div>
        <ul className="profile-info__description-contacts">
          {Object.entries(contacts).every(contact => contact === null) ? null : <h3>You can also find me here:</h3>}
          {
            Object.entries(contacts).map((item, index) => {
              if (item[1] != null) {
                return (
                  <li key={index} className="profile-info__description-contacts-item">
                    <a href={item[1]}>
                      <img src={Object.entries(icons).filter(icon => icon[0] === item[0])[0][1]} alt={`${item[0]} Icon`} />
                      {item[1]}
                    </a>
                  </li>
                );
              }
              return null;
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default ProfileInfo;