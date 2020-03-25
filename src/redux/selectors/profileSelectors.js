import { createSelector } from 'reselect';

const getStatusSelector = (state) => {
  return state.profilePage.status;
}

const getIsFetchingSelector = (state) => {
  return state.profilePage.isFetching;
}



export const getProfile = (state) => {
  return state.profilePage.profile;
}

export const getPosts = (state) => {
  return state.profilePage.posts;
}

export const getAuthorizedUserId = (state) => {
  return state.auth.userId;
}




export const getStatus = createSelector(getStatusSelector, (status) => {
  return status;
});

export const getIsFetching = createSelector(getIsFetchingSelector, (fetching) => {
  return fetching;
});