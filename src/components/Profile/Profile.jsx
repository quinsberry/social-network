import React, { memo } from 'react';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

import './Profile.scss';

const Profile = (props) => {
  return (
    <div className="profile-page">
      {!props.profile ? (
        null
      ) : (
          <>
            <ProfileInfo profile={props.profile} isOwner={props.isOwner} lookingForAJob={props.profile.lookingForAJob} lookingForAJobDescription={props.profile.lookingForAJobDescription} photos={props.profile.photos} status={props.status} updateStatus={props.updateStatus} />
            <MyPostsContainer posts={props.posts} />
          </>
        )}
    </div>
  );
};

export default memo(Profile);