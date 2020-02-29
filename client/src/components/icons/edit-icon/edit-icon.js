import React from 'react';

import { faEdit } from '@fortawesome/free-solid-svg-icons';

import StaticIcon from '../static-icon';

import './edit-icon.scss';

const EditIcon = ({onClick}) => {
    return (
        <span onClick={onClick} className="edit-icon">
            <StaticIcon icon={faEdit}/>
        </span>
    );
}
export default EditIcon;
