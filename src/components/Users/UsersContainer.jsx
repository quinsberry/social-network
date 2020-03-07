import React, { Component } from 'react'
import { connect } from 'react-redux';

import Users from './Users';
import { followToggle, setUsers, setCurrentPage, setTotalUsersCount, setIsFetchingToggle, setOnFollowing } from '../../redux/reducers/usersReducer';
import { usersAPI } from '../../api/api';

import './Users.scss';


class UsersContainer extends Component {

  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.setIsFetchingToggle(true);

      usersAPI.getUsers(this.props.currentPage, this.props.pagesSize)
        .then(data => {
          this.props.setUsers(data.items);
          this.props.setTotalUsersCount(data.totalCount);
          this.props.setIsFetchingToggle(false);
        });
    }
  }

  onPageChange = (pageNumber) => {
    this.props.setIsFetchingToggle(true);
    this.props.setCurrentPage(pageNumber);

    usersAPI.getUsers(pageNumber, this.props.pagesSize)
      .then(data => {
        this.props.setUsers(data.items);
        this.props.setIsFetchingToggle(false);
      });
  }



  render() {
    let pagesDisplay = [this.props.currentPage - 2, this.props.currentPage - 1, this.props.currentPage, this.props.currentPage + 1, this.props.currentPage + 2];
    return (
      <Users pagesDisplay={pagesDisplay} onPageChange={this.onPageChange
      } currentPage={this.props.currentPage} users={this.props.users} followToggle={this.props.followToggle} isFetching={this.props.isFetching} follow={usersAPI.follow} unfollow={usersAPI.unfollow} setOnFollowing={this.props.setOnFollowing} onFollowing={this.props.onFollowing} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    onFollowing: state.usersPage.onFollowing
  }
}



export default connect(mapStateToProps, {
  followToggle,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  setIsFetchingToggle,
  setOnFollowing
})(UsersContainer);