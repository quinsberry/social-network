import React from 'react';

import './ProfileInfo.scss';

const ProfileInfo = () => {
  return (
    <div className="profile-info">
      <div>
        <img src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350' alt="img" />
      </div>
      <div className="description">
        ava + description
      </div>
    </div>
  );
};

export default ProfileInfo;