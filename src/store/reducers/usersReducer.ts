import { usersAPI } from '@api/users-api'

import { TBaseThunk, TInferActions, TUser, ResultCodes } from '@typings/types'

export type UsersInitialState = typeof initialState
export type FilterType = typeof initialState.filter

const initialState = {
  users: [] as Array<TUser>,
  pageSize: 5,
  totalUsersCount: 20,
  currentPage: 1,
  isFetching: false,
  onFollowing: [] as Array<number>, // array of users ids
  filter: {
    term: '',
    friend: null as boolean | null,
  },
}

export const usersReducer = (state = initialState, action: TActions): UsersInitialState => {
  switch (action.type) {
    case 'USERS/FOLLOW_TOGGLE':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: !user.followed }
          }
          return user
        }),
      }
    case 'USERS/SET_USERS':
      return {
        ...state,
        users: action.users,
      }
    case 'USERS/SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      }
    case 'USERS/SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case 'USERS/SET_TOTAL_USERS_COUNT':
      return {
        ...state,
        totalUsersCount: action.totalCount,
      }
    case 'USERS/IS_FETCHING_TOGGLE':
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case 'USERS/ON_FOLLOWING_TOGGLE':
      return {
        ...state,
        onFollowing: action.onFollowing
          ? [...state.onFollowing, action.userId]
          : state.onFollowing.filter((id) => id !== action.userId),
      }
    default:
      return state
  }
}

type TActions = TInferActions<typeof actions>

export const actions = {
  followToggle: (userId: number) => ({ type: 'USERS/FOLLOW_TOGGLE', userId } as const),
  setUsers: (users: Array<TUser>) => ({ type: 'USERS/SET_USERS', users } as const),
  setFilter: (filter: FilterType) => ({ type: 'USERS/SET_FILTER', payload: filter } as const),
  setCurrentPage: (currentPage: number) =>
    ({ type: 'USERS/SET_CURRENT_PAGE', currentPage } as const),
  setTotalUsersCount: (totalCount: number) =>
    ({ type: 'USERS/SET_TOTAL_USERS_COUNT', totalCount } as const),
  setIsFetchingToggle: (isFetching: boolean) =>
    ({ type: 'USERS/IS_FETCHING_TOGGLE', isFetching } as const),
  setOnFollowing: (onFollowing: boolean, userId: number) =>
    ({ type: 'USERS/ON_FOLLOWING_TOGGLE', onFollowing, userId } as const),
}

type TThunk = TBaseThunk<TActions>

export const requestUsersTC = (
  currentPage: number,
  pagesSize: number,
  filter: FilterType,
): TThunk => {
  return async (dispatch) => {
    dispatch(actions.setIsFetchingToggle(true))
    dispatch(actions.setFilter(filter))

    const data = await usersAPI.getUsers(currentPage, pagesSize, filter.term, filter.friend)

    dispatch(actions.setIsFetchingToggle(false))
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
  }
}

export const onPageChangeTC = (
  pageNumber: number,
  pagesSize: number,
  filter: FilterType,
): TThunk => {
  return async (dispatch) => {
    dispatch(actions.setIsFetchingToggle(true))
    dispatch(actions.setCurrentPage(pageNumber))

    const data = await usersAPI.getUsers(pageNumber, pagesSize, filter.term, filter.friend)

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
