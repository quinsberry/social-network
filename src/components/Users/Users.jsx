import React from 'react';
import classnames from 'classnames';

import User from './User';

const Users = ({ pagesDisplay, onPageChange, currentPage, users, followToggle }) => {
  return (
    <div className="users">
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
          <User key={user.id} id={user.id} photo={user.photos.small} name={user.name} status={user.status} followed={user.followed} follow={followToggle} />
        ))
      }
    </div>
  );
};

export default Users;