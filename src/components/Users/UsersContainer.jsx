import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';

import Users from './Users';
import { requestUsersTC, onPageChangeTC, followingToggleTC } from '../../redux/reducers/usersReducer';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getOnFollowing } from '../../redux/selectors/usersSelectors';

import './Users.scss';


class UsersContainer extends Component {

  componentDidMount() {
    const { users, currentPage, pageSize } = this.props;
    this.props.requestUsersTC(users.length, currentPage, pageSize);
  }

  onPageChange = (pageNumber) => {
    const { pageSize } = this.props;
    this.props.onPageChangeTC(pageNumber, pageSize);
  }

  followingToggle = (followed, id) => {
    this.props.followingToggleTC(followed, id)
  }

  isDisabledBtn = (id) => {
    return this.props.onFollowing.some(followingId => followingId === id)
  }



  render() {

    return (
      <Users onPageChange={this.onPageChange
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