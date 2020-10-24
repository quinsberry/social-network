import React from 'react'

import ProfileData from './ProfileData/ProfileData'

import './ProfileInfo.scss'
import userDefaultImage from '@assets/userphoto_default.png'

import { TProfile, TPhotos } from '@typings/types'

type Props = {
  profile: TProfile
  lookingForAJob: string
  lookingForAJobDescription: string
  photos: TPhotos
  status: string | null
  updateStatus: (statusText: string) => void
  isOwner: boolean
}

const ProfileInfo: React.FC<Props> = ({
  profile,
  lookingForAJob,
  lookingForAJobDescription,
  photos,
  status,
  updateStatus,
  isOwner,
}) => {
  return (
    <div className="profile-info">
      <div className="profile-info__avatar">
        <img
          className="profile-info__avatar-user-img"
          src={photos.large ? photos.large : userDefaultImage}
          alt="User avatar"
        />

        <span className="profile-info__avatar-user-job">
          {lookingForAJob ? 'Looking for a job' : ''}
        </span>
        {lookingForAJob && (
          <span className="profile-info__avatar-user-job-descr">{lookingForAJobDescription}</span>
        )}
      </div>
      <ProfileData
        profile={profile}
        status={status}
        updateStatus={updateStatus}
        isOwner={isOwner}
      />
    </div>
  )
}

export default ProfileInfo
