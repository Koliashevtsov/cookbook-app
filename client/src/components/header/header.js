import React from 'react';

import { Link } from 'react-router-dom';

import './header.scss';

import UserIcon from '../icons/user-icon';

const Header = (props) => {
    return (
        <div className="header">
            <div className="header-container">
                <Link to="/">
                    <span className="active">Home</span>
                </Link>
                <Link to="/add-item">
                    <span>Add new</span>
                </Link>

                <span className="user-icon-wrapper">
                    <UserIcon/>
                </span>
            </div>
        </div>
    );
}
export default Header;
