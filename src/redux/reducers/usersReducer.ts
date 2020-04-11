import { usersAPI } from '../../api/api';

import { TUser } from '../../types/types';

const FOLLOW_TOGGLE = 'users/FOLLOW_TOGGLE';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const IS_FETCHING_TOGGLE = 'users/IS_FETCHING_TOGGLE';
const ON_FOLLOWING_TOGGLE = 'users/ON_FOLLOWING_TOGGLE';

type TInitialState = typeof initialState

const initialState = {
  users: [] as Array<TUser>,
  pageSize: 5 as number,
  totalUsersCount: 20 as number,
  currentPage: 1 as number,
  isFetching: false as boolean,
  onFollowing: [] as Array<number> // array of users ids
}



const usersReducer = (state = initialState, action: any): TInitialState => {
  switch (action.type) {
    case FOLLOW_TOGGLE:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: !user.followed }
          }
          return user
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

type TFollowToggle = {
  type: typeof FOLLOW_TOGGLE
  userId: number
}
type TSetUsers = {
  type: typeof SET_USERS
  users: TUser
}
type TSetCurrentPage = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
type TSetTotalUsersCount = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalCount: number
}
type TSetIsFetchingToggle = {
  type: typeof IS_FETCHING_TOGGLE
  isFetching: boolean
}
type TSetOnFollowing = {
  type: typeof ON_FOLLOWING_TOGGLE
  onFollowing: boolean
  userId: number
}

export const followToggle = (userId: number): TFollowToggle => {
  return {
    type: FOLLOW_TOGGLE,
    userId
  }
}

export const setUsers = (users: TUser): TSetUsers => {
  return {
    type: SET_USERS,
    users
  }
}

export const setCurrentPage = (currentPage: number): TSetCurrentPage => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage
  }
}

export const setTotalUsersCount = (totalCount: number): TSetTotalUsersCount => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    totalCount
  }
}

export const setIsFetchingToggle = (isFetching: boolean): TSetIsFetchingToggle => {
  return {
    type: IS_FETCHING_TOGGLE,
    isFetching
  }
}

export const setOnFollowing = (onFollowing: boolean, userId: number): TSetOnFollowing => {
  return {
    type: ON_FOLLOWING_TOGGLE,
    onFollowing,
    userId
  }
}



export const requestUsersTC = (usersLength: number, currentPage: number, pagesSize: number) => {
  return async (dispatch: any) => {
    if (usersLength === 0) {
      dispatch(setIsFetchingToggle(true))

      const data = await usersAPI.getUsers(currentPage, pagesSize)

      dispatch(setIsFetchingToggle(false))
      dispatch(setUsers(data.items))
      dispatch(setTotalUsersCount(data.totalCount))
    }
  }
}

export const onPageChangeTC = (pageNumber: number, pagesSize: number) => {
  return async (dispatch: any) => {
    dispatch(setIsFetchingToggle(true))
    dispatch(setCurrentPage(pageNumber))

    const data = await usersAPI.getUsers(pageNumber, pagesSize)

    dispatch(setIsFetchingToggle(false))
    dispatch(setUsers(data.items))
  }
}

export const followingToggleTC = (followed: boolean, id: number) => {
  return async (dispatch: any) => {
    dispatch(setOnFollowing(true, id))

    if (!followed) {
      const data = await usersAPI.follow(id)

      if (data.resultCode === 0) {
        dispatch(followToggle(id))
        dispatch(setOnFollowing(false, id))

      }

    }
    const data = await usersAPI.unfollow(id)

    if (data.resultCode === 0) {
      dispatch(followToggle(id))
      dispatch(setOnFollowing(false, id))
    }
  }
}



export default usersReducer