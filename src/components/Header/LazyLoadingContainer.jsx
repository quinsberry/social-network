import React, { Component } from 'react';
import { connect } from 'react-redux';

import { lazyLoading } from '../../redux/reducers/appReducer';

class LazyLoadingContainer extends Component {

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

export default connect(null, {
  lazyLoading
})(LazyLoadingContainer);