import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions as appActions } from '@store/reducers/appReducer'
import { actions as authActions } from '@store/reducers/authReducer'
import { actions as chatActions } from '@store/reducers/chatReducer'
import { actions as dialogsActions } from '@store/reducers/dialogsReducer'
import { actions as profileActions } from '@store/reducers/profileReducer'
import { actions as usersActions } from '@store/reducers/usersReducer'

/**
 * TODO: Now useActions describe just actions but not thunks.
 *       To solve this problem we need to unite all our thunks just like common actions.
 */

const allActions = {
  ...appActions,
  ...authActions,
  ...chatActions,
  ...dialogsActions,
  ...profileActions,
  ...usersActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(allActions, dispatch)
}
