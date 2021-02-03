import { createSelector } from 'reselect'
import { TAppState } from '@typings/types'

const getStatusSelector = (state: TAppState) => {
  return state.profilePage.status
}

const getIsFetchingSelector = (state: TAppState) => {
  return state.profilePage.isFetching
}

export const getProfile = (state: TAppState) => {
  return state.profilePage.profile
}

export const getPosts = (state: TAppState) => {
  return state.profilePage.posts
}

export const getAuthorizedUserId = (state: TAppState) => {
  return state.auth.userId
}

export const getStatus = createSelector(getStatusSelector, (status) => {
  return status
})

export const getIsFetching = createSelector(getIsFetchingSelector, (fetching) => {
  return fetching
})
