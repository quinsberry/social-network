import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import User from './User'
import { UsersSearchForm } from './UsersSearchForm'
import Paginator from '@components/common/Paginator/Paginator'

import {
  getCurrentPage,
  getFilter,
  getIsFetching,
  getOnFollowing,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from '@store/selectors/usersSelectors'
import {
  FilterType,
  followingToggleTC,
  onPageChangeTC,
  requestUsersTC,
} from '@store/reducers/usersReducer'

import './Users.scss'

interface UsersProps {}

function Users(): React.ReactElement {
  const dispatch = useDispatch()

  const users = useSelector(getUsers)
  const filter = useSelector(getFilter)
  const pageSize = useSelector(getPageSize)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const isFetching = useSelector(getIsFetching)
  const onFollowing = useSelector(getOnFollowing)

  const history = useHistory()

  // useEffect(() => {
  //   history.push({

  //   })
  // }, [filters])

  useEffect(() => {
    dispatch(requestUsersTC(currentPage, pageSize, filter))
  }, [])

  const onPageChange = (pageNumber: number) => {
    dispatch(onPageChangeTC(pageNumber, pageSize, filter))
  }

  const followingToggle = (followed: boolean, id: number) => {
    dispatch(followingToggleTC(followed, id))
  }

  const isDisabledBtn = (id: number) => {
    return onFollowing.some((followingId) => followingId === id)
  }

  const onFilterChange = (filter: FilterType) => {
    dispatch(requestUsersTC(1, pageSize, filter))
  }

  return (
    <div className="users">
      {isFetching && null}
      <UsersSearchForm onFilterChange={onFilterChange} />
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
