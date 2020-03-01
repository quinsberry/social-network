import { connect } from 'react-redux';

import Dialogs from './Dialogs';

import { sendMessageActionCreactor } from '../../redux/reducers/dialogsReducer';


const mapStateToProps = (state) => {
  return {
    state: state.dialogsPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageText) => {
      dispatch(sendMessageActionCreactor(newMessageText));
    }
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;