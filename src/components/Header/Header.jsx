import React from 'react';

import logo from '../../assets/logo.svg';

import './Header.scss';

const Header = () => {
    return (
        <header className='header'>
            <div className="logo">
                <img src={logo} alt='Network Logo' />
                <span>Social Network</span>
            </div>
            <div className="otherside"></div>
        </header>
    );
}

export default Header;