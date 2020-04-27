import axios from 'axios'

import { TProfile, TUser, ResultCodes } from './../types/types'

// ------- General types -------

type TServerResponse<D> = {
  data: D
  messages: Array<string>
  resultCode: ResultCodes
}

// -----------------------------

const API_KEY = '90913beb-1c38-4638-9d50-6c42811abb79'


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': API_KEY
  }
})

// ------- usersAPI  -------

type TGetUsers = {
  items: Array<TUser>
  totalCount: number
  error: null | string
}

export const usersAPI = {

  getUsers(currentPage = 1, pageSize = 10) {
    return (
      instance
        .get<TGetUsers>(`users?page=${currentPage}&count=${pageSize}`)
        .then(res => res.data)
    )
  },
  follow(id: number) {
    return (
      instance
        .post<TServerResponse<{}>>(`follow/${id}`)
        .then(res => res.data)
    )
  },
  unfollow(id: number) {
    return (
      instance
        .delete<TServerResponse<{}>>(`follow/${id}`)
        .then(res => res.data)
    )
  }
}

// ------- profileAPI  -------

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

// ------- authAPI  -------

type TMeResponseData = {
  id: number
  email: string
  login: string
}

type TLoginData = {
  userId: number
}

type TLogoutData = {}


export const authAPI = {
  me() {
    return (
      instance
        .get<TServerResponse<TMeResponseData>>(`auth/me`)
        .then(res => res.data)
    )
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return (
      instance
        .post<TServerResponse<TLoginData>>(`auth/login`, { email, password, rememberMe, captcha })
        .then(res => res.data)
    )
  },
  logout() {
    return (
      instance
        .delete<TServerResponse<TLogoutData>>(`auth/login`)
        .then(res => res.data)
    )
  }
}

// ------- securityAPI  -------

type TGetCaptchaUrl = {
  url: string
}

export const securityAPI = {
  getCaptchaUrl() {
    return (
      instance
        .get<TGetCaptchaUrl>(`security/get-captcha-url`)
        .then(res => res.data)
    )
  }
}




