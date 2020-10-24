import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import User from './User'
import Paginator from '@components/common/Paginator/Paginator'

import {
  getCurrentPage,
  getIsFetching,
  getOnFollowing,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from '@store/selectors/usersSelectors'
import { followingToggleTC, onPageChangeTC, requestUsersTC } from '@store/reducers/usersReducer'

import './Users.scss'

interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
  const dispatch = useDispatch()

  const users = useSelector(getUsers)
  const pageSize = useSelector(getPageSize)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const isFetching = useSelector(getIsFetching)
  const onFollowing = useSelector(getOnFollowing)

  useEffect(() => {
    const usersLength = users.length
    dispatch(requestUsersTC(usersLength, currentPage, pageSize))
  }, [])

  const onPageChange = (pageNumber: number) => {
    dispatch(onPageChangeTC(pageNumber, pageSize))
  }

  const followingToggle = (followed: boolean, id: number) => {
    dispatch(followingToggleTC(followed, id))
  }

  const isDisabledBtn = (id: number) => {
    return onFollowing.some((followingId) => followingId === id)
  }

  return (
    <div className="users">
      {isFetching && null}
      <>
        <Paginator
          totalItemsCount={totalUsersCount}
          pageSize={pageSize}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
        {users &&
          users.map((user) => (
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
      </>
    </div>
  )
}

export default Users
