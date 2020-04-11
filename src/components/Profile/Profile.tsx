import React, { memo } from 'react'

import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts'

import './Profile.scss'

import { TProfile } from '../../types/types'

type Props = {
  profile: TProfile | null
  status: string | null
  updateStatus: (statusText: string) => void
  isOwner: boolean
}

const Profile: React.FC<Props> = ({ profile, status, updateStatus, isOwner }) => {
  return (
    <div className="profile-page">
      {profile && (
        <>
          <ProfileInfo profile={profile} isOwner={isOwner} lookingForAJob={profile.lookingForAJob} lookingForAJobDescription={profile.lookingForAJobDescription} photos={profile.photos} status={status} updateStatus={updateStatus} />
          <MyPosts />
        </>
      )}
    </div>
  )
}

export default memo(Profile)