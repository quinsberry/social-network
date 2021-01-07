import React, { ChangeEvent } from 'react'

import ProfileEditForm from './ProfileEditForm/ProfileEditForm'

import './Settings.scss'

import { TProfile, TProfileEditFormValue } from '@typings/types'

type Props = {
  profile: TProfile | null
  savePhoto: (file: File) => void
  onSubmit: (data: TProfileEditFormValue) => void
}

const Settings: React.FC<Props> = ({ profile, savePhoto, onSubmit }) => {
  const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const files: any = event?.target.files
    if (files.length) {
      savePhoto(files[0])
    }
  }

  return (
    <div className="settings-page">
      {profile && (
        <>
          <ProfileEditForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
          <div className="settings-page__profile-imageChange">
            <h3>Change you profile photo</h3>
            <input type="file" onChange={onMainPhotoSelected} />
          </div>
        </>
      )}
    </div>
  )
}

export default Settings
