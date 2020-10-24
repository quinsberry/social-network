import { createSelector } from 'reselect'
import { TAppState } from '@typings/types'

const getUsersSelector = (state: TAppState) => {
  return state.usersPage.users
}
export const getUsers = createSelector(getUsersSelector, (users) => {
  return users
})

export const getPageSize = (state: TAppState) => {
  return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: TAppState) => {
  return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: TAppState) => {
  return state.usersPage.currentPage
}

export const getIsFetching = (state: TAppState) => {
  return state.usersPage.isFetching
}

export const getOnFollowing = (state: TAppState) => {
  return state.usersPage.onFollowing
}
