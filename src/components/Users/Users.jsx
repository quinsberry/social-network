import React, { Component } from 'react';
import * as axios from 'axios';

import User from './User';

import './Users.scss';

class Users extends Component {

  componentDidMount() {
    axios
      .get('https://social-network.samuraijs.com/api/1.0/users')
      .then(res => {
        this.props.setUsers(res.data.items);
      });
  }

  render() {
    return (
      <div className="users">
        {this.props.users &&
          this.props.users.map(user => (
            <User key={user.id} id={user.id} photo={user.photos.small} name={user.name} status={user.status} city={"user.location.city"} country={"user.location.country"} followed={user.followed} follow={this.followToggle} />
          ))
        }
      </div>
    );
  }
}

export default Users;