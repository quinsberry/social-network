import React from 'react';
import classnames from 'classnames';

import User from './User';

const Users = ({ pagesDisplay, onPageChange, currentPage, users, isFetching, onFollowing, followingToggle, isDisabledBtn }) => {

  console.log('render');
  return (
    <div className="users">
      {isFetching &&
        null
      }
      <>
        <div className="users__page-numbers">
          {pagesDisplay.map((p, index) => {
            if (p > 0) {
              return (
                <span onClick={() => onPageChange(p)} key={index} className={classnames('select', { selected: currentPage === p })}>{p}</span>
              );
            } else {
              return undefined;
            }
          })}
        </div>
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