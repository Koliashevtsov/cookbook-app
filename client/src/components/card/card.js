import React from 'react';

import './card.scss';

import DateComponent from '../date-component';

const Card = (props) => {
    const { item: { title, descriptions, updatedDate, imageUrl },
    publishedDate, handleClick } = props;
    return (
        <div className="card" onClick={handleClick}>
            <div className="card-meta">
                <h3>
                    {title}
                </h3>
                <div className="card-meta-descriptions">
                    <p>
                        {descriptions}
                    </p>
                </div>
                <div className="card-meta-date">
                    <span>Published at:
                        <DateComponent date={publishedDate}/>
                    </span>
                    <span>Updated at:
                        <DateComponent date={updatedDate}/>
                    </span>
                </div>
            </div>
            <div className="card-image">
                <img src={imageUrl}/>
            </div>
        </div>
    );
}

export default Card;
