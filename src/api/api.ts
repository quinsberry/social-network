import axios from 'axios'

import { ResultCodes } from './../types/types'


export type TServerResponse<D = {}> = {
  data: D
  messages: Array<string>
  resultCode: ResultCodes
}


const API_KEY = '90913beb-1c38-4638-9d50-6c42811abb79'


export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': API_KEY
  }
})




