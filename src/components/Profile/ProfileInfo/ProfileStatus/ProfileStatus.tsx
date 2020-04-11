import React, { useState, useEffect, ChangeEvent } from 'react';
import classnames from 'classnames';

import './ProfileStatus.scss';

type Props = {
  status: string | null
  updateStatus: (statusText: string) => void
  isOwner: number | undefined
}

const ProfileStatus: React.FC<Props> = ({ status, updateStatus, isOwner }) => {

  const [editMode, setEditMode] = useState(false);
  const [statusText, editStatusText] = useState('');

  useEffect(() => {
    if (status) {
      editStatusText(status);
    }
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

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    editStatusText(e.target.value)
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
              <input onChange={onStatusChange} autoFocus onBlur={() => { deactivateEditMode() }} type="text" value={statusText} />
            </div>
          )
      }
    </div>
  );
};

export default ProfileStatus;