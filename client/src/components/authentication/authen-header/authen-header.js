import React from 'react';

import LinkC from '../../link-c';

import './authen-header.scss';

const AuthenHeader = (props) => {
    const { tab } = props;
    return (
        <div className="authen-header">
            <LinkC link={"sign-up"} isActive={tab}>
                    Sign Up
            </LinkC>
            <LinkC link={"sign-in"} isActive={tab}>
                    Sign In
            </LinkC>
        </div>
    );
}
export default AuthenHeader;
