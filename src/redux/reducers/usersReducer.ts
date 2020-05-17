import { usersAPI } from '../../api/users-api'

import { TAppState, TInferActions, TUser, ResultCodes } from '../../types/types'
import { ThunkAction } from 'redux-thunk'

const FOLLOW_TOGGLE = 'users/FOLLOW_TOGGLE'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const IS_FETCHING_TOGGLE = 'users/IS_FETCHING_TOGGLE'
const ON_FOLLOWING_TOGGLE = 'users/ON_FOLLOWING_TOGGLE'




type TInitialState = typeof initialState

const initialState = {
  users: [] as Array<TUser>,
  pageSize: 5,
  totalUsersCount: 20,
  currentPage: 1,
  isFetching: false,
  onFollowing: [] as Array<number> // array of users ids
}



const usersReducer = (state = initialState, action: TActions): TInitialState => {
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

type TActions = TInferActions<typeof actions>

export const actions = {
  followToggle: (userId: number) => ({ type: FOLLOW_TOGGLE, userId } as const),
  setUsers: (users: Array<TUser>) => ({ type: SET_USERS, users } as const),
  setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
  setTotalUsersCount: (totalCount: number) => ({ type: SET_TOTAL_USERS_COUNT, totalCount } as const),
  setIsFetchingToggle: (isFetching: boolean) => ({ type: IS_FETCHING_TOGGLE, isFetching } as const),
  setOnFollowing: (onFollowing: boolean, userId: number) => ({ type: ON_FOLLOWING_TOGGLE, onFollowing, userId } as const)
}






type TThunk = ThunkAction<Promise<void>, TAppState, unknown, TActions>


export const requestUsersTC = (usersLength: number, currentPage: number, pagesSize: number): TThunk => {
  return async (dispatch) => {
    if (usersLength === ResultCodes.Success) {
      dispatch(actions.setIsFetchingToggle(true))

      const data = await usersAPI.getUsers(currentPage, pagesSize)

      dispatch(actions.setIsFetchingToggle(false))
      dispatch(actions.setUsers(data.items))
      dispatch(actions.setTotalUsersCount(data.totalCount))
    }
  }
}

export const onPageChangeTC = (pageNumber: number, pagesSize: number): TThunk => {
  return async (dispatch) => {
    dispatch(actions.setIsFetchingToggle(true))
    dispatch(actions.setCurrentPage(pageNumber))

    const data = await usersAPI.getUsers(pageNumber, pagesSize)

    dispatch(actions.setIsFetchingToggle(false))
    dispatch(actions.setUsers(data.items))
  }
}

export const followingToggleTC = (followed: boolean, id: number): TThunk => {
  return async (dispatch) => {
    dispatch(actions.setOnFollowing(true, id))

    if (!followed) {
      const data = await usersAPI.follow(id)

      if (data.resultCode === ResultCodes.Success) {
        dispatch(actions.followToggle(id))
        dispatch(actions.setOnFollowing(false, id))
        return
      }

    }
    const data = await usersAPI.unfollow(id)

    if (data.resultCode === ResultCodes.Success) {
      dispatch(actions.followToggle(id))
      dispatch(actions.setOnFollowing(false, id))
    }
  }
}



export default usersReducer