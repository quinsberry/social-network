import React from 'react';

import ProfileStatus from '../ProfileStatus/ProfileStatus';


import './ProfileData.scss';
import github from '../../../../assets/icons/github.svg';
import vk from '../../../../assets/icons/vk.svg';
import facebook from '../../../../assets/icons/facebook.svg';
import instagram from '../../../../assets/icons/instagram.svg';
import twitter from '../../../../assets/icons/twitter.svg';
import website from '../../../../assets/icons/website.svg';
import youtube from '../../../../assets/icons/youtube.svg';
import mainLink from '../../../../assets/icons/website.svg';

const ProfileData = ({ profile, status, updateStatus, isOwner }) => {

  const { aboutMe, contacts, fullName } = profile;

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

  return (
    <div className="profile-info__description">
      <div className="profile-info__description-username">
        <h2>{fullName}</h2>
      </div>
      <ProfileStatus status={status} updateStatus={updateStatus} isOwner={isOwner} />
      {aboutMe && (
        <div className="profile-info__description-about">
          <h3>About me</h3>
          <span>{aboutMe}</span>
        </div>
      )}
      <ul className="profile-info__description-contacts">
        {Object.values(contacts).every(contact => contact === null || contact === '') ? null : <h3>You can also find me here:</h3>}
        {
          Object.entries(contacts).map((item, index) => {
            if (item[1] !== null && item[1].length > 1) {
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
  );
};

export default ProfileData;


