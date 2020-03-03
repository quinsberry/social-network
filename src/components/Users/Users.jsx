import React, { Component } from 'react';
import * as axios from 'axios';
import classnames from 'classnames';

import User from './User';

import './Users.scss';

class Users extends Component {

  API_PATH = 'https://social-network.samuraijs.com/api/1.0';

  componentDidMount() {
    if (this.props.users.length === 0) {
      axios
        .get(`${this.API_PATH}/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then(res => {
          this.props.setUsers(res.data.items);
          this.props.setTotalUsersCount(res.data.totalCount);
        });
    }
  }

  onPageChange = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    axios
      .get(`${this.API_PATH}/users?page=${pageNumber}&count=${this.props.pageSize}`)
      .then(res => {
        this.props.setUsers(res.data.items);
      });
  }



  render() {

    // const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

    // let pages = [];

    // for (let i = 1; i <= pagesCount; i++) {
    //   pages.push(i);
    // }

    let pagesDisplay = [this.props.currentPage - 2, this.props.currentPage - 1, this.props.currentPage, this.props.currentPage + 1, this.props.currentPage + 2];

    return (
      <div className="users">
        <div className="users__page-numbers">
          {pagesDisplay.map((p, index) => {
            if (p > 0) {
              return (
                <span onClick={() => this.onPageChange(p)} key={index} className={classnames('select', { selected: this.props.currentPage === p })}>{p}</span>
              );
            } else {
              return undefined;
            }
          })}
        </div>
        {
          this.props.users &&
          this.props.users.map(user => (
            <User key={user.id} id={user.id} photo={user.photos.small} name={user.name} status={user.status} city={"user.location.city"} country={"user.location.country"} followed={user.followed} follow={this.props.followToggle} />
          ))
        }
      </div >
    );
  }
}

export default Users;