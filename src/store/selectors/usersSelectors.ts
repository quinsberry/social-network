import { createSelector } from 'reselect'
import { TAppState } from '@typings/types'
import { FilterType } from '@store/reducers/usersReducer'

const getUsersSelector = (state: TAppState) => {
  return state.usersPage.users
}
export const getUsers = createSelector(getUsersSelector, (users) => {
  return users
})

export const getPageSize = (state: TAppState): number => {
  return state.usersPage.pageSize
}

export const getFilter = (state: TAppState): FilterType => {
  return state.usersPage.filter
}

export const getTotalUsersCount = (state: TAppState): number => {
  return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: TAppState): number => {
  return state.usersPage.currentPage
}

export const getIsFetching = (state: TAppState): boolean => {
  return state.usersPage.isFetching
}

export const getOnFollowing = (state: TAppState): number[] => {
  return state.usersPage.onFollowing
}
