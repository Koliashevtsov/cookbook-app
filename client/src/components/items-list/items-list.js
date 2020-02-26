import React from 'react';

import './items-list.scss';

import CardContainer from '../../containers/card-container';

const ItemsList = (props) => {
    const { items } = props;
    return (
        <div className="items-list">
            <ul>
                {
                    items.map(item => {
                        return (
                            <li key={item.id}>
                                <CardContainer
                                    itemVersion={item.listVersions[0]}
                                    publishedDate={item.publishedDate}/>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}
export default ItemsList;
