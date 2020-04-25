import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'



const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    if (!props.isAuth) {
      return (
        <Redirect to='/login' />
      )
    }
    return <Component {...props} />
  }


  const mapStateToPropsForRedirect = (state) => {
    return {
      isAuth: state.auth.isAuth
    }
  }

  const ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

  return ConnectedRedirectComponent
}

export default withAuthRedirect