import React from 'react';

import githubSvg from '../../../assets/icons/github.svg';
import vkSvg from '../../../assets/icons/vk.svg';
import facebookSvg from '../../../assets/icons/facebook.svg';
import instagramSvg from '../../../assets/icons/instagram.svg';
import twitterSvg from '../../../assets/icons/twitter.svg';
import websiteSvg from '../../../assets/icons/website.svg';
import youtubeSvg from '../../../assets/icons/youtube.svg';
import userDefaultImage from '../../../assets/userphoto_default.png';

import './ProfileInfo.scss';

const ProfileInfo = ({ about, contacts, lookingForAJob, lookingForAJobDescr, fullName, photos }) => {

  const icons = {
    github: githubSvg,
    vk: vkSvg,
    facebook: facebookSvg,
    instagram: instagramSvg,
    twitter: twitterSvg,
    website: websiteSvg,
    youtube: youtubeSvg
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
        <div className="profile-info__description-about">{about}</div>
        <ul className="profile-info__description-contacts">
          <h3>You can also find me here:</h3>
          {Object.entries(contacts).map((item, index) => {
            if (item[1] != null) {
              return (
                <li key={index} className="profile-info__description-contacts-item">
                  <a href={item[1]}>
                    <img src={Object.entries(icons).filter(icon => icon[0] === item[0])[0][1]} alt={`${item[0]} Icon`} />
                    {item[1]}
                  </a>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProfileInfo;