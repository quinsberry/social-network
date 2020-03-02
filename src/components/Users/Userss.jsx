import React, { useEffect } from 'react';
import * as axios from 'axios';

import User from './User';

import './Users.scss';

const Users = ({ users, followToggle, setUsers }) => {

  const getUsers = () => {
    if (users.length === 0) {

      console.log('asd');
      axios
        .get('https://social-network.samuraijs.com/api/1.0/users')
        .then(res => {
          setUsers(res.data.items);
        });

    }
  }

  useEffect(() => {
    alert('asd');
    getUsers();
  });



  return (
    <div className="users">
      {users &&
        users.map(user => (
          <User key={user.id} id={user.id} photo={user.photos.small} name={user.name} status={user.status} city={"user.location.city"} country={"user.location.country"} followed={user.followed} follow={followToggle} />
        ))
      }
    </div>
  );
};

export default Users;