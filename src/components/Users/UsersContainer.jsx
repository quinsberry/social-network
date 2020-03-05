import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as axios from 'axios';

import Users from './Users';
import { followToggle, setUsers, setCurrentPage, setTotalUsersCount, setIsFetchingToggle } from '../../redux/reducers/usersReducer';

import './Users.scss';


class UsersContainer extends Component {

  API_PATH = 'https://social-network.samuraijs.com/api/1.0';

  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.setIsFetchingToggle(true);
      axios
        .get(`${this.API_PATH}/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then(res => {
          this.props.setUsers(res.data.items);
          this.props.setTotalUsersCount(res.data.totalCount);
          this.props.setIsFetchingToggle(false);
        });
    }
  }

  onPageChange = (pageNumber) => {
    this.props.setIsFetchingToggle(true);
    this.props.setCurrentPage(pageNumber);
    axios
      .get(`${this.API_PATH}/users?page=${pageNumber}&count=${this.props.pageSize}`)
      .then(res => {
        this.props.setUsers(res.data.items);
        this.props.setIsFetchingToggle(false);
      });
  }



  render() {
    let pagesDisplay = [this.props.currentPage - 2, this.props.currentPage - 1, this.props.currentPage, this.props.currentPage + 1, this.props.currentPage + 2];

    return (
      <Users pagesDisplay={pagesDisplay} onPageChange={this.onPageChange
      } currentPage={this.props.currentPage} users={this.props.users} followToggle={this.props.followToggle} isFetching={this.props.isFetching} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching
  }
}



export default connect(mapStateToProps, {
  followToggle,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  setIsFetchingToggle,
})(UsersContainer);