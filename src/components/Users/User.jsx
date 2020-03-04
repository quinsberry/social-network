import React from 'react';
import classnames from 'classnames';

import userPhoto from '../../assets/userphoto_default.png';


const User = ({ name, id, status, city, country, followed, photo, follow }) => {
  return (
    <div className="users__user">
      <div className="users__user-leftside">
        <img className="user-image" src={photo != null ? photo : userPhoto} alt="User avatar" />
        <button onClick={() => { follow(id) }} className="follow-btn btn">{followed ? 'UNFOLLOW' : 'FOLLOW'}</button>
      </div>
      <div className="users__user-description">
        <div className="descr-leftside">
          <h3 className="descr-leftside__username">{name}</h3>
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