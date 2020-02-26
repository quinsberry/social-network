import React from 'react';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';

import './Profile.scss';

const Profile = ({ state }) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={state.posts} />
    </div>
  );
}

export default Profile;