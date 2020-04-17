import { TRootReducer } from '../redux/redux-store'

export enum ResultCodes {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10
}

export type TAppState = ReturnType<TRootReducer>

export type TPost = {
  id: number
  postMessage: string
  likes: number
}

export type TContacts = {
  facebook: string | null
  website: string | null
  vk: string | null
  twitter: string | null
  instagram: string | null
  youtube: string | null
  github: string | null
  mainLink: string | null
}

export type TPhotos = {
  small: string | null
  large: string | null
}

export type TProfile = {
  aboutMe: string | null
  contacts: TContacts
  lookingForAJob: string
  lookingForAJobDescription: string
  fullName: string
  userId: number
  photos: TPhotos
}

export type TUser = {
  name: string
  id: number
  uniqueUrlName: string | null
  photos: TPhotos
  status: string | null
  followed: boolean
}
