import React from 'react';

import './Header.scss';

const Header = () => {
    return (
        <header className='header'>
            <div className="logo">
                <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' alt='bg content' />
                <span>Social Network</span>
            </div>
            <div className="otherside"></div>
        </header>
    );
}

export default Header;