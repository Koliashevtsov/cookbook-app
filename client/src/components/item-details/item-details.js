import React from 'react';

import './item-details.scss';

import EditIcon from '../icons/edit-icon';
import DeleteIcon from '../icons/delete-icon';
import DateComponent from '../date-component';

const ItemDetails = (props) => {
    const {
        currentVersion: {
            title,
            imageUrl,
            descriptions,
            updatedDate
        },
        publishedDate,
        onClickEdit,
        onClickDelete
    } = props;

    return (
        <div className="item-details">
            <div className="item-details-container">
                <div className="item-details-header">
                    <h3>
                        {title}
                    </h3>
                    <div className="icons-wrapper">
                        <EditIcon onClick={onClickEdit}/>
                        <DeleteIcon onClick={onClickDelete}/>
                    </div>
                </div>
                <div className="item-details-image">
                    <img src={imageUrl}/>
                </div>
                <div className="item-details-descriptions">
                    <p>
                        {descriptions}
                    </p>
                </div>
                <div className="item-details-date">
                    <span>Published at:
                         <DateComponent date={publishedDate}/>
                     </span>
                    <span>Updated at:
                         <DateComponent date={updatedDate}/>
                     </span>
                </div>
            </div>
        </div>
    );
}

export default ItemDetails;
