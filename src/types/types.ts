import { TRootReducer } from '../store/store'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

// ------------ GENERAL TYPES ------------
//
export type TAppState = ReturnType<TRootReducer>

export type TInferActions<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type TBaseThunk<A extends Action = Action, R = Promise<void>> = ThunkAction<
  R,
  TAppState,
  unknown,
  A
>

// -------------------------------

export enum ResultCodes {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}

export type TLoginFormValues = {
  email: string
  password: string
  rememberMe: boolean
  captcha: null | string
}

export type TNewMessageFormValue = {
  newMessage: string
}

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

export type TDialogsPage = {
  dialogs: Array<TDialog>
  messages: Array<TMessage>
}

export type TDialog = {
  id: number
  name: string
}

export type TMessage = {
  id: number
  message: string
}

// Header
export type TDataProcessing = {
  isFetchingAuth: boolean
  isProcessing: boolean
  lazyLoading: boolean
  isFetchingUsers: boolean
  isFetchingProfile: boolean
}

// Profile
export type TNewPostFormValue = {
  newPost: string
}

// Settings
export type TProfileEditFormValue = TProfile

export type TFieldValidator = (value: string) => string | undefined
