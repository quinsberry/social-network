import React from 'react';


const User = ({ name, id, status, city, country, followed, photo, follow }) => {

  return (
    <div className="users__user">
      <div className="users__user-leftside">
        <img className="user-image" src={photo} alt="User avatar" />
        <button onClick={() => {follow(id)}} className="follow-btn btn">{followed ? 'UNFOLLOW' : 'FOLLOW'}</button>
      </div>
      <div className="users__user-description">
        <div className="descr-leftside">
          <h3 className="descr-leftside__username">{name}</h3>
          <span className="descr-leftside__status">{status ? status : 'This user has no status'}</span>
        </div>
        <div className="descr-rightside">
          <h3 className="descr-rightside__country">{country}, </h3>
          <h3 className="descr-rightside__city">{city}</h3>
        </div>
      </div>
    </div>
  );
};

export default User;