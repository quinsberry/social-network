import React, { Component } from 'react';
import { connect } from 'react-redux';

import { lazyLoading } from '../../redux/reducers/appReducer';

import { TAppState } from '../../types/types';


type TMapDispatch = {
  lazyLoading: () => void
}

type Props = TMapDispatch

class LazyLoadingContainer extends Component<Props> {

  componentDidMount() {
    this.props.lazyLoading();
  }

  componentWillUnmount() {
    this.props.lazyLoading();
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default connect<{}, TMapDispatch, {}, TAppState>(null, {
  lazyLoading
})(LazyLoadingContainer);