import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Users from './Users'
import { requestUsersTC, onPageChangeTC, followingToggleTC } from '../../redux/reducers/usersReducer'
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getOnFollowing } from '../../redux/selectors/usersSelectors'

import './Users.scss';

import { TUser } from '../../types/types'
import { TAppState } from '../../redux/redux-store'

type TMapState = {
  currentPage: number
  pageSize: number
  users: Array<TUser>
  onFollowing: Array<number>
  isFetching: boolean
  totalUsersCount: number
}

type TMapDispatch = {
  requestUsersTC: (usersLength: number, currentPage: number, pageSize: number) => void
  onPageChangeTC: (pageNumber: number, pageSize: number) => void
  followingToggleTC: (followed: boolean, id: number) => void
}

type Props = TMapState & TMapDispatch

class UsersContainer extends PureComponent<Props> {

  componentDidMount() {
    const { users, currentPage, pageSize } = this.props;
    const usersLength = users.length
    this.props.requestUsersTC(usersLength, currentPage, pageSize);
  }

  onPageChange = (pageNumber: number) => {
    const { pageSize } = this.props;
    this.props.onPageChangeTC(pageNumber, pageSize);
  }

  followingToggle = (followed: boolean, id: number) => {
    this.props.followingToggleTC(followed, id)
  }

  isDisabledBtn = (id: number) => {
    return this.props.onFollowing.some(followingId => followingId === id)
  }



  render() {

    return (
      <Users onPageChange={this.onPageChange
      } currentPage={this.props.currentPage} users={this.props.users} isFetching={this.props.isFetching} onFollowing={this.props.onFollowing} followingToggle={this.followingToggle} isDisabledBtn={this.isDisabledBtn} totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize} />
    );
  }
}


const mapStateToProps = (state: TAppState): TMapState => {
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
  connect<TMapState, TMapDispatch, {}, TAppState>(mapStateToProps, {
    requestUsersTC,
    onPageChangeTC,
    followingToggleTC
  })
)(UsersContainer);