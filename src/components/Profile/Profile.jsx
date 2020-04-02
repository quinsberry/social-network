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
            <ProfileInfo isOwner={props.isOwner} about={props.profile.aboutMe} contacts={props.profile.contacts} lookingForAJob={props.profile.lookingForAJob} lookingForAJobDescr={props.profile.lookingForAJobDescr} fullName={props.profile.fullName} photos={props.profile.photos} status={props.status} updateStatus={props.updateStatus} savePhoto={props.savePhotoTC} />
            <MyPostsContainer posts={props.posts} />
          </>
        )}
    </div>
  );
};

export default memo(Profile);