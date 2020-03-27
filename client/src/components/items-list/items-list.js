import React from 'react';

import './items-list.scss';

import CardContainer from '../../containers/card-container';

const ItemsList = (props) => {
    const { items } = props;
    return (
        <div className="items-list">
            <ul>
                {
                    items.map((item, index) => {
                        return (
                            <li key={index}>
                                <CardContainer
                                    itemVersion={item.versions[0]}
                                    publishedDate={item.publishedDate}
                                    recipeId={item._id}/>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}
export default ItemsList;
