import { compose } from 'redux'
import { connect } from 'react-redux'

import { sendMessageTC } from '@store/reducers/dialogsReducer'
import withAuthRedirect from '@hoc/withAuthRedirect'
import Dialogs from './Dialogs'

import { TAppState, TDialogsPage } from '@typings/types'

type TMapState = {
  state: TDialogsPage
}

type TMapDispatch = {
  sendMessageTC: (newMessage: string) => void
}

const mapStateToProps = (state: TAppState): TMapState => {
  return {
    state: state.dialogsPage,
  }
}

export default compose<React.ComponentType>(
  connect<TMapState, TMapDispatch, {}, TAppState>(mapStateToProps, {
    sendMessageTC,
  }),
  withAuthRedirect,
)(Dialogs)
