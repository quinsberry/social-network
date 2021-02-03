import { instance, TServerResponse } from './api'
import { TUser } from '@typings/types'

type TGetUsers = {
  items: Array<TUser>
  totalCount: number
  error: null | string
}

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10, term: string, friend: null | boolean = null) {
    return instance
      .get<TGetUsers>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend === null ? '' : `&friend=${friend}`),
      )
      .then((res) => res.data)
  },
  follow(id: number) {
    return instance.post<TServerResponse>(`follow/${id}`).then((res) => res.data)
  },
  unfollow(id: number) {
    return instance.delete<TServerResponse>(`follow/${id}`).then((res) => res.data)
  },
}
