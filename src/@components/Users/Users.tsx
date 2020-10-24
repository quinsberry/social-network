import React from 'react'

import User from './User'
import Paginator from '@components/common/Paginator/Paginator'

import { TUser } from '@typings/types'

type Props = {
  totalUsersCount: number
  pageSize: number
  onPageChange: (pageNumber: number) => void
  currentPage: number
  users: Array<TUser>
  isFetching: boolean
  onFollowing: Array<number>
  followingToggle: (followed: boolean, id: number) => void
  isDisabledBtn: (id: number) => boolean
}

const Users: React.FC<Props> = ({
  totalUsersCount,
  pageSize,
  onPageChange,
  currentPage,
  users,
  isFetching,
  onFollowing,
  followingToggle,
  isDisabledBtn,
}) => {
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
