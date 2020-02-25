import React from 'react';

import MyPosts from './MyPosts/MyPosts';

import './Profile.scss';

const Profile = () => {
  return (
    <div>
      <div>
        <img src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350' alt="img" />
      </div>
      <div>
        ava + description
    </div>
      <MyPosts />
    </div>
  );
}

export default Profile;