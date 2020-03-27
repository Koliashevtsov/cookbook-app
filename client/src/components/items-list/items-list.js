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
                                    itemVersion={item.versions[0]}
                                    publishedDate={item.publishedDate}
                                    recipeId={item.id}/>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}
export default ItemsList;
