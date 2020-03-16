import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

const ProfileStatus = ({ status, updateStatus }) => {

  const [editMode, setEditMode] = useState(false);
  const [statusText, editStatusText] = useState(status);

  useEffect(() => {
    editStatusText(status);
  }, [status]);

  return (
    <div className="profile-info__description-status">
      {
        !editMode ? (
          <div>
            <span className={classnames({ nostatus: !status })} onDoubleClick={() => { setEditMode(true) }}>{status ? status : 'Tap to add you status'}</span>
          </div>
        ) : (
            <div>
              <input onChange={(e) => editStatusText(e.target.value)} autoFocus onBlur={() => { setEditMode(false); updateStatus(statusText) }} type="text" value={statusText} />
            </div>
          )
      }
    </div>
  );
};

export default ProfileStatus;