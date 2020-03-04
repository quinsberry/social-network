import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as axios from 'axios';

import Users from './Users';
import { followToggleAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC } from '../../redux/reducers/usersReducer';

import './Users.scss';


class UsersContainer extends Component {

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
    let pagesDisplay = [this.props.currentPage - 2, this.props.currentPage - 1, this.props.currentPage, this.props.currentPage + 1, this.props.currentPage + 2];

    return (
      <Users pagesDisplay={pagesDisplay} onPageChange={this.onPageChange} currentPage={this.props.currentPage} users={this.props.users} followToggle={this.props.followToggle} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    followToggle: (userId) => {
      dispatch(followToggleAC(userId));
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users));
    },
    setCurrentPage: (currentPage) => {
      dispatch(setCurrentPageAC(currentPage));
    },
    setTotalUsersCount: (totalCount) => {
      dispatch(setTotalUsersCountAC(totalCount));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);