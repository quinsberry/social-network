import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import userPhoto from '../../assets/userphoto_default.png';


const User = ({ name, id, status, followed, photo, onFollowing, followingToggle, isDisabledBtn }) => {

  return (
    <div className="users__user">
      <div className="users__user-leftside">
        <NavLink to={`/profile/${id}`}>
          <img className="user-image" src={photo != null ? photo : userPhoto} alt="User avatar" />
        </NavLink>
        <button disabled={isDisabledBtn(id)} onClick={() => {
          followingToggle(followed, id);

        }} className={classnames("follow-btn btn", { disabled: onFollowing })}>{followed ? 'UNFOLLOW' : 'FOLLOW'}</button>
      </div>
      <div className="users__user-description">
        <div className="descr-leftside">
          <NavLink to={`/profile/${id}`}>
            <h3 className="descr-leftside__username">{name}</h3>
          </NavLink>
          <span className={classnames('descr-leftside__status', { 'active': status })}>{status ? status : 'This user has no status'}</span>
        </div>
        <div className="descr-rightside">
          <h3 className="descr-rightside__country">Here must be a county, </h3>
          <h3 className="descr-rightside__city">Here must be a city</h3>
        </div>
      </div>
    </div>
  );
};

export default User;