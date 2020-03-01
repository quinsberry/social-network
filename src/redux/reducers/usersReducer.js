const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE';
const SET_USERS = 'SET_USERS';

const initialState = {
  users: []
};



const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW_TOGGLE:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: !user.followed }
          }
          return user;
        })
      }
    case SET_USERS:
      return {
        ...state,
        users: [...state.users, ...action.users]
      }
    default:
      return state;
  }
}

export const followToggleAC = (userId) => {
  return {
    type: FOLLOW_TOGGLE,
    userId
  }
}

export const setUsersAC = (users) => {
  return {
    type: SET_USERS,
    users
  }
}


export default usersReducer;