import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';

import Users from './Users';
import { requestUsersTC, onPageChangeTC, followingToggleTC } from '../../redux/reducers/usersReducer';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getOnFollowing } from '../../redux/selectors/usersSelectors';

import './Users.scss';


class UsersContainer extends Component {

  componentDidMount() {
    this.props.requestUsersTC(this.props.users.length, this.props.currentPage, this.props.pagesSize);
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
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    onFollowing: getOnFollowing(state)
  }
}


export default compose(
  connect(mapStateToProps, {
    requestUsersTC,
    onPageChangeTC,
    followingToggleTC
  })
)(UsersContainer);