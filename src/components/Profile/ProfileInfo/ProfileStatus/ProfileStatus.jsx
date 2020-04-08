import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import './ProfileStatus.scss';

const ProfileStatus = ({ status, updateStatus, isOwner }) => {

  const [editMode, setEditMode] = useState(false);
  const [statusText, editStatusText] = useState(status);

  useEffect(() => {
    editStatusText(status);
  }, [status]);

  const activateEditMode = () => {
    if (isOwner) {
      setEditMode(true);
    }
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    updateStatus(statusText);
  }

  return (
    <div className="status">
      {
        !editMode ? (
          <div>
            <span className={classnames({ nostatus: !status })} onDoubleClick={() => { activateEditMode() }}>{status ? status : (isOwner ? 'Tap to add you status' : 'User has no status')}</span>
          </div>
        ) : (
            <div>
              <input onChange={(e) => editStatusText(e.target.value)} autoFocus onBlur={() => { deactivateEditMode() }} type="text" value={statusText} />
            </div>
          )
      }
    </div>
  );
};

export default ProfileStatus;