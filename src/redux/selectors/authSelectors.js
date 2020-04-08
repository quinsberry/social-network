import { createSelector } from 'reselect';


const getUserIdSelector = (state) => {
  return state.auth.userId;
}

const getIsAuthSelector = (state) => {
  return state.auth.isAuth;
}

const getCaptchaUrlSelector = (state) => {
  return state.auth.captchaUrl;
}


export const getCaptchaUrl = createSelector(getCaptchaUrlSelector, (captchaUrl) => {
  return captchaUrl;
});
export const getUserId = createSelector(getUserIdSelector, (userId) => {
  return userId;
});
export const getIsAuth = createSelector(getIsAuthSelector, (isAuth) => {
  return isAuth;
});