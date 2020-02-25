import React from 'react';
import { NavLink } from 'react-router-dom';


import './Dialog.scss';

const Dialog = ({ name, id }) => {
  return (
    <div className="dialogs__users-dialog">
      <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
    </div>
  );
};

export default Dialog;