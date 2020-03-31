import React from 'react';

import User from './User';
import Paginator from '../common/Paginator/Paginator';

const Users = ({ onPageChange, currentPage, users, isFetching, onFollowing, followingToggle, isDisabledBtn }) => {

  console.log('render');
  return (
    <div className="users">
      {isFetching &&
        null
      }
      <>
        <Paginator onPageChange={onPageChange} currentPage={currentPage} />
        {
          users &&
          users.map(user => (
            <User key={user.id} id={user.id} photo={user.photos.small} name={user.name} status={user.status} followed={user.followed} onFollowing={onFollowing} followingToggle={followingToggle} isDisabledBtn={isDisabledBtn} />
          ))
        }
      </>
    </div>
  );
};

export default Users;