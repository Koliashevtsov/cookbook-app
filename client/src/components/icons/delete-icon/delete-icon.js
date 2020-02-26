import React from 'react';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import StaticIcon from '../static-icon';

import './delete-icon.scss';

const DeleteIcon = (props) => {
    return (
        <span className="delete-icon">
            <StaticIcon icon={ faTrashAlt }/>
        </span>
    );
}
export default DeleteIcon;
