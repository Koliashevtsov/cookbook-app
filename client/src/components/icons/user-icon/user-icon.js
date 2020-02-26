import React from 'react';

import { faUserCheck } from '@fortawesome/free-solid-svg-icons';

import StaticIcon from '../static-icon';

const UserIcon = (props) => {
    return (
        <div className="user-icon">
            <StaticIcon icon={faUserCheck}/>
        </div>
    );
}
export default UserIcon;
