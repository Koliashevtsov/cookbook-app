import React from 'react';

import CardContainer from '../../containers/card-container';

import './preversions-list.scss'

const PreversionsList = (props) => {
    const { items, publishedDate } = props;
    return (
        <div className="preversions-list">
            <ul>
                {
                    items.map((item, index) => {
                        return (
                            <li key={index}>
                                <CardContainer
                                    itemVersion={item}
                                    publishedDate={publishedDate}/>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}
export default PreversionsList;
