import { instance } from './api'

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