import { createSelector } from 'reselect';


export const getUserIdSelector = (state) => {
  return state.auth.userId;
}

export const getUserId = createSelector(getUserIdSelector, (userId) => {
  return userId;
});