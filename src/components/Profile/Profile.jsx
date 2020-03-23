import React from 'react';

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
            <ProfileInfo about={props.profile.aboutMe} contacts={props.profile.contacts} lookingForAJob={props.profile.lookingForAJob} lookingForAJobDescr={props.profile.lookingForAJobDescr} fullName={props.profile.fullName} photos={props.profile.photos} status={props.status} updateStatus={props.updateStatus} />
            <MyPostsContainer posts={props.posts} />
          </>
        )}
    </div>
  );
}

export default Profile;