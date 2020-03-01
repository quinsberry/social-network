import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
    return (
        <nav className='nav'>
            <ul>
                <li className="nav__item">
                    <NavLink to="/profile">Profile</NavLink>
                </li>
                <li className="nav__item">
                    <NavLink to="/dialogs">Messages</NavLink>
                </li>
                <li className="nav__item">
                    <NavLink to="/users">Users</NavLink>
                </li>
                <li className="nav__item">
                    <NavLink to="/news">News</NavLink>
                </li>
                <li className="nav__item">
                    <NavLink to="/settings">Settings</NavLink>
                </li>
            </ul>
        </nav>
    );

}

export default Navbar;