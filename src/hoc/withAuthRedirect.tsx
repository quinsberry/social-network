import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { TAppState } from '@typings/types'

type TMapState = {
  isAuth: boolean
}

function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<TMapState> = (props) => {
    const { isAuth, ...restProps } = props

    if (!isAuth) return <Redirect to="/login" />

    return <WrappedComponent {...((restProps as unknown) as WCP)} />
  }

  const mapStateToPropsForRedirect = (state: TAppState) => {
    return {
      isAuth: state.auth.isAuth,
    }
  }

  const ConnectedRedirectComponent = connect<TMapState, {}, WCP, TAppState>(
    mapStateToPropsForRedirect,
  )(RedirectComponent)

  return ConnectedRedirectComponent
}

export default withAuthRedirect
