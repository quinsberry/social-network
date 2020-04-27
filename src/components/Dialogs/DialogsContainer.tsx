import { compose } from 'redux';
import { connect } from 'react-redux';


import { sendMessageTC } from '../../redux/reducers/dialogsReducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import Dialogs from './Dialogs';

import { TAppState, TDialogsPage } from '../../types/types'

type TMapState = {
  state: TDialogsPage
}

type TMapDispatch = {
  sendMessageTC: (newMessage: string) => void
}

const mapStateToProps = (state: TAppState): TMapState => {
  return {
    state: state.dialogsPage
  }
}

export default compose(
  connect<TMapState, TMapDispatch, {}, TAppState>(mapStateToProps, {
    sendMessageTC
  }),
  withAuthRedirect
)(Dialogs);