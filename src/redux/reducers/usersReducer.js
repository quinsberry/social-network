import { usersAPI } from '../../api/api';

const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const IS_FETCHING_TOGGLE = 'IS_FETCHING_TOGGLE';
const ON_FOLLOWING_TOGGLE = 'ON_FOLLOWING_TOGGLE';

const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 20,
  currentPage: 1,
  isFetching: false,
  onFollowing: []
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
    case IS_FETCHING_TOGGLE:
      return {
        ...state,
        isFetching: action.isFetching
      }
    case ON_FOLLOWING_TOGGLE:
      return {
        ...state,
        onFollowing: action.onFollowing ? [...state.onFollowing, action.userId] : state.onFollowing.filter(id => id !== action.userId)
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
    type: IS_FETCHING_TOGGLE,
    isFetching
  }
}

export const setOnFollowing = (onFollowing, userId) => {
  return {
    type: ON_FOLLOWING_TOGGLE,
    onFollowing,
    userId
  }
}



export const requestUsersTC = (usersLength, currentPage, pagesSize) => {
  return (dispatch) => {
    if (usersLength === 0) {
      dispatch(setIsFetchingToggle(true));

      usersAPI.getUsers(currentPage, pagesSize)
        .then(data => {
          dispatch(setIsFetchingToggle(false));
          dispatch(setUsers(data.items));
          dispatch(setTotalUsersCount(data.totalCount));
        });
    }
  }
}

export const onPageChangeTC = (pageNumber, pagesSize) => {
  return (dispatch) => {
    dispatch(setIsFetchingToggle(true));
    dispatch(setCurrentPage(pageNumber));

    usersAPI.getUsers(pageNumber, pagesSize)
      .then(data => {
        dispatch(setIsFetchingToggle(false));
        dispatch(setUsers(data.items));
      });
  }
}

export const followingToggleTC = (followed, id) => {
  return (dispatch) => {
    dispatch(setOnFollowing(true, id));

    if (!followed) {
      usersAPI.follow(id)
        .then(data => {
          if (data.resultCode === 0) {
            dispatch(followToggle(id));
            dispatch(setOnFollowing(false, id));
          }
        });
    } else {
      usersAPI.unfollow(id)
        .then(data => {
          if (data.resultCode === 0) {
            dispatch(followToggle(id));
            dispatch(setOnFollowing(false, id));
          }
        });
    }
  }
}



export default usersReducer;