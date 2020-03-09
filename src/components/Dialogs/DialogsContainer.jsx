import { connect } from 'react-redux';


import { sendMessage } from '../../redux/reducers/dialogsReducer';
import Dialogs from './Dialogs';


const mapStateToProps = (state) => {
  return {
    state: state.dialogsPage,
    isAuth: state.auth.isAuth
  }
}


export default connect(mapStateToProps, {
  sendMessage
})(Dialogs);;