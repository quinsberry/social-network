import React from 'react';
import { NavLink } from 'react-router-dom';

import { TDialog } from '../../../types/types'

import './Dialog.scss';

type Props = TDialog

const Dialog: React.FC<Props> = ({ name, id }) => {
  return (
    <div className="dialogs__users-dialog">
      <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
    </div>
  );
};

export default Dialog;