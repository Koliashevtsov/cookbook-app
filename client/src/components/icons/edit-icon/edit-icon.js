import React from 'react';

import { faEdit } from '@fortawesome/free-solid-svg-icons';

import StaticIcon from '../static-icon';

import './edit-icon.scss';

const EditIcon = (props) => {
    return (
        <span className="edit-icon">
            <StaticIcon icon={faEdit}/>
        </span>
    );
}
export default EditIcon;
