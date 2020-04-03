import React from 'react';

import './authen-header.scss';

const AuthenHeader = (props) => {
    const { tab, handleTab } = props;
    return (
        <div className="authen-header">
            <div className={`sign-up btn ${ tab == 'register' ? "active" : ""}` }
                 onClick={() => handleTab('register')}>
                Sign Up
            </div>
            <div className={`sign-in btn ${ tab == 'login' ? "active" : "" }`}
                 onClick={() => handleTab('login')}>
                Sign In
            </div>
        </div>
    );
}
export default AuthenHeader;
