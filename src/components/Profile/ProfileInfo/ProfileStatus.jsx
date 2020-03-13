import React, { useState } from 'react';

const ProfileStatus = ({ status }) => {

  const [editMode, setEditMode] = useState(false);
  const [statusText, editStatusText] = useState(status);

  return (
    <div className="profile-info__description-status">
      {!editMode ? (
        <div>
          <span onDoubleClick={() => { setEditMode(true) }}>{statusText}</span>
        </div>
      ) : (
          <div>
            <input onChange={(e) => editStatusText(e.target.value)} autoFocus onBlur={() => { setEditMode(false) }} type="text" value={statusText} />
          </div>
        )
      }
    </div>
  );
};

export default ProfileStatus;