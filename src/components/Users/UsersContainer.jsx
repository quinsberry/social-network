import React, { Component } from 'react'
import { connect } from 'react-redux';

import Users from './Users';
import { getUsersTC, onPageChangeTC, followingToggleTC } from '../../redux/reducers/usersReducer';

import './Users.scss';


class UsersContainer extends Component {

  componentDidMount() {
    this.props.getUsersTC(this.props.users.length, this.props.currentPage, this.props.pagesSize);
  }

  onPageChange = (pageNumber) => {
    this.props.onPageChangeTC(pageNumber, this.props.pagesSize);
  }

  followingToggle = (followed, id) => {
    this.props.followingToggleTC(followed, id)
  }

  isDisabledBtn = (id) => {
    return this.props.onFollowing.some(followingId => followingId === id)
  }



  render() {
    let pagesDisplay = [this.props.currentPage - 2, this.props.currentPage - 1, this.props.currentPage, this.props.currentPage + 1, this.props.currentPage + 2];
    return (
      <Users pagesDisplay={pagesDisplay} onPageChange={this.onPageChange
      } currentPage={this.props.currentPage} users={this.props.users} isFetching={this.props.isFetching} onFollowing={this.props.onFollowing} followingToggle={this.followingToggle} isDisabledBtn={this.isDisabledBtn} />
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
  getUsersTC,
  onPageChangeTC,
  followingToggleTC
})(UsersContainer);