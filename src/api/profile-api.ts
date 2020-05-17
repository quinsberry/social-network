import { instance, TServerResponse } from './api'
import { TProfile } from './../types/types'

type TPhotosData = {
  photos: {
    large: string
    small: string
  }
}


export const profileAPI = {

  getProfile(userId: number) {
    return (
      instance
        .get<TProfile>(`profile/${userId}`)
        .then(res => res.data)
    )
  },
  getStatus(userId: number) {
    return (
      instance
        .get<string | null>(`profile/status/${userId}`)
        .then(res => res.data)
    )
  },
  updateStatus(status: string | null) {
    return (
      instance
        .put<TServerResponse<{}>>(`profile/status`, { status })
        .then(res => res.data)
    )
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append('image', photoFile)
    return (
      instance
        .put<TServerResponse<TPhotosData>>(`profile/photo`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => res.data)
    )
  },
  saveProfile(profile: TProfile) {
    return (
      instance
        .put<TServerResponse<{}>>(`profile`, profile)
        .then(res => res.data)
    )
  }
}