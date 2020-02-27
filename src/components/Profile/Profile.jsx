import React from 'react';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';

import './Profile.scss';

const Profile = ({ state, addPost }) => {
  return (
    <div className="profile=page">
      <ProfileInfo />
      <MyPosts posts={state.posts} addPost={addPost} />
    </div>
  );
}

export default Profile;