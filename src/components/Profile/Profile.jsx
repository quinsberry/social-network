import React from 'react';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';

import './Profile.scss';

const Profile = ({ state, dispatch }) => {
  return (
    <div className="profile=page">
      <ProfileInfo />
      <MyPosts posts={state.posts} dispatch={dispatch} />
    </div>
  );
}

export default Profile;