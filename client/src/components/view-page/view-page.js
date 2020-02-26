import React from 'react';

import ItemDetailsContainer from '../../containers/item-details-container';
import PreversionsListContainer from '../../containers/preversions-list-container';

import './view-page.scss';

const ViewPage = (props) => {
    return (
        <div className="view-page">
            <ItemDetailsContainer/>
            <PreversionsListContainer/>
        </div>
    );
}
export default ViewPage;
