import { compose } from 'redux';
import { connect } from 'react-redux';


import { sendMessage } from '../../redux/reducers/dialogsReducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import Dialogs from './Dialogs';

import { TAppState, TDialogsPage } from '../../types/types'

type TMapState = {
  state: TDialogsPage
}

type TMapDispatch = {
  sendMessage: (newMessage: string) => void
}

const mapStateToProps = (state: TAppState): TMapState => {
  return {
    state: state.dialogsPage
  }
}

export default compose(
  connect<TMapState, TMapDispatch, {}, TAppState>(mapStateToProps, {
    sendMessage
  }),
  withAuthRedirect
)(Dialogs);