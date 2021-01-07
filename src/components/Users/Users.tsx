import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { User } from './User'
import { UsersSearchForm } from './UsersSearchForm'
import { Paginator } from '@components/common'

import {
  getCurrentPage,
  getFilter,
  getIsFetching,
  getOnFollowing,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from '@store/selectors/usersSelectors'
import { FilterType, followingToggleTC, onPageChangeTC, requestUsersTC } from '@store/reducers/usersReducer'

import './Users.scss'
import { BooleanParam, NumberParam, StringParam, useQueryParams } from 'use-query-params'

interface UsersProps {}

const Users: React.FC<UsersProps> = (): React.ReactElement => {
  const dispatch = useDispatch()

  const users = useSelector(getUsers)
  const filter = useSelector(getFilter)
  const pageSize = useSelector(getPageSize)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const isFetching = useSelector(getIsFetching)
  const onFollowing = useSelector(getOnFollowing)

  const [query, setQuery] = useQueryParams({
    term: StringParam,
    friend: BooleanParam,
    page: NumberParam,
  })
  console.log('query: ', query)

  useEffect(() => {
    dispatch(requestUsersTC(query.page || 1, pageSize, { term: query.term || '', friend: query.friend || null }))
  }, [])

  useEffect(() => {
    setQuery({
      term: filter.term,
      friend: filter.friend,
      page: currentPage,
    })
  }, [filter, currentPage])
  const onPageChange = (pageNumber: number): void => {
    dispatch(onPageChangeTC(pageNumber, pageSize, filter))
  }

  const followingToggle = (followed: boolean, id: number): void => {
    dispatch(followingToggleTC(followed, id))
  }

  const isDisabledBtn = (id: number): boolean => {
    return onFollowing.some((followingId) => followingId === id)
  }

  const onFilterChange = (filter: FilterType): void => {
    dispatch(requestUsersTC(1, pageSize, filter))
  }

  return (
    <div className="users">
      {isFetching && null}
      <UsersSearchForm filter={filter} onFilterChange={onFilterChange} />
      <Paginator
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onPageChange={onPageChange}
        currentPage={currentPage}
      />
      {users?.map((user) => (
        <User
          key={user.id}
          id={user.id}
          photo={user.photos.small}
          name={user.name}
          status={user.status}
          followed={user.followed}
          onFollowing={onFollowing}
          followingToggle={followingToggle}
          isDisabledBtn={isDisabledBtn}
        />
      ))}
    </div>
  )
}

export default Users
