import React from 'react';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../common/Preloader/Preloader';

import './Profile.scss';

const Profile = (props) => {
  return (
    <div className="profile-page">
      {!props.profile ? (
        <Preloader />
      ) : (
          <>
            <ProfileInfo about={props.profile.aboutMe} contacts={props.profile.contacts} lookingForAJob={props.profile.lookingForAJob} lookingForAJobDescr={props.profile.lookingForAJobDescr} fullName={props.profile.fullName} photos={props.profile.photos} />
            <MyPostsContainer posts={props.posts} />
          </>
        )}
    </div>
  );
}

export default Profile;