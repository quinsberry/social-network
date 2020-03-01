import React from 'react';
import * as axios from 'axios';

import User from './User';

import './Users.scss';

const Users = ({ users, followToggle, setUsers }) => {


  if (users.length === 0) {

    axios
      .get('https://social-network.samuraijs.com/api/1.0/users')
      .then(res => {
        setUsers(res.data.items);
        console.log(res.data.items);
      });

  }

  return (
    <div className="users">
      {users &&
        users.map(user => (
          <User key={user.id} id={user.id} photo={user.photoUrl} name={user.name} status={user.status} city={"user.location.city"} country={"user.location.country"} followed={user.followed} follow={followToggle} />
        ))
      }
    </div>
  );
};

export default Users;