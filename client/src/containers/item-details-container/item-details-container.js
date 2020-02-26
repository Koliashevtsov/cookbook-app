import React, { Component } from 'react';
import { connect } from 'react-redux';

import ItemDetails from '../../components/item-details';

class ItemDetailsContainer extends Component {
    render(){
        return (
            <ItemDetails
                currentVersion={this.props.currentVersion}
                publishedDate={this.props.publishedDate}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentVersion: state.currentVersion,
        publishedDate: state.listRecipes[state.currentVersion.parentId].publishedDate
    };
}
export default connect(mapStateToProps)(ItemDetailsContainer);
