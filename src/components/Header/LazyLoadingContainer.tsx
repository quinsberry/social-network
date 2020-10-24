import React, { Component } from 'react'
import { connect } from 'react-redux'

import { lazyLoadingTC } from '../../store/reducers/appReducer'

import { TAppState } from '../../types/types'

type TMapDispatch = {
  lazyLoadingTC: () => void
}

type Props = TMapDispatch

class LazyLoadingContainer extends Component<Props> {
  componentDidMount() {
    this.props.lazyLoadingTC()
  }

  componentWillUnmount() {
    this.props.lazyLoadingTC()
  }

  render() {
    return <div></div>
  }
}

export default connect<{}, TMapDispatch, {}, TAppState>(null, {
  lazyLoadingTC,
})(LazyLoadingContainer)
