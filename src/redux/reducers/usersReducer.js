const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const ISFETCHING_TOGGLE = 'ISFETCHING_TOGGLE';

const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 20,
  currentPage: 1,
  isFetching: false
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
        users: action.users
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      }
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalCount
      }
    case ISFETCHING_TOGGLE:
      return {
        ...state,
        isFetching: action.isFetching
      }
    default:
      return state;
  }
}

export const followToggle = (userId) => {
  return {
    type: FOLLOW_TOGGLE,
    userId
  }
}

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users
  }
}

export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage
  }
}

export const setTotalUsersCount = (totalCount) => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    totalCount
  }
}

export const setIsFetchingToggle = (isFetching) => {
  return {
    type: ISFETCHING_TOGGLE,
    isFetching
  }
}


export default usersReducer;