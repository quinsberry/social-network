import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import './Header.scss';

const Header = ({ userId, email, login, isAuth, isFetching, logout }) => {
    return (
        <header className='header'>
            <div className="logo">
                <img src={logo} alt='Network Logo' />
                <span>Social Network</span>
            </div>
            <div className="otherside">
                {!isFetching && (
                    <div className="auth">
                        {isAuth ? (
                            <>
                                <h4 className="auth__authorised"><strong>{login}</strong></h4>
                                <button onClick={logout}>Logout</button>
                            </>
                        ) : (
                                <NavLink to={`/login`}>
                                    <h3 className="auth__login">Log in</h3>
                                </NavLink>
                            )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;