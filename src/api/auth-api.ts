import { instance, TServerResponse } from './api'

type TMeResponseData = {
  id: number
  email: string
  login: string
}

type TLoginData = {
  userId: number
}


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
        .delete<TServerResponse>(`auth/login`)
        .then(res => res.data)
    )
  }
}