import React from 'react';
import { NavLink } from 'react-router-dom';

import logoSvg from '../../assets/logo.svg';
import logoutSvg from '../../assets//icons/common/logout.svg'
import Preloader from '../common/Preloader/Preloader';

import './Header.scss';

const Header = ({ userId, email, login, isAuth, isFetching, logout, lazyLoading }) => {
    return (
        <header className='header'>
            <div className="logo">
                <img src={logoSvg} alt='Network Logo' />
                <span>Social Network</span>
            </div>
            <div className="loadingside">
                {isFetching || lazyLoading && <Preloader />}
            </div>
            <div className="otherside">
                {!isFetching && (
                    <div className="auth">
                        {isAuth ? (
                            <>
                                <h4 className="auth__authorised"><strong>{login}</strong></h4>
                                <img className="logout" onClick={logout} src={logoutSvg} alt="Logout svg Icon" />
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