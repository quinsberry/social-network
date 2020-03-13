import { compose } from 'redux';
import { connect } from 'react-redux';


import { sendMessage } from '../../redux/reducers/dialogsReducer';
import Dialogs from './Dialogs';
import withAuthRedirect from '../../hoc/withAuthRedirect';


const mapStateToProps = (state) => {
  return {
    state: state.dialogsPage
  }
}

export default compose(
  connect(mapStateToProps, {
    sendMessage
  }),
  withAuthRedirect
)(Dialogs);