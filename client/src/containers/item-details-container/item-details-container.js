import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getCurrentVersion } from '../../actions';

import ItemDetails from '../../components/item-details';

import { compose } from '../../utils';

class ItemDetailsContainer extends Component {

    componentDidMount(){
        this.props.getCurrentVersion()
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.updatedDate !== prevProps.match.params.updatedDate){
            this.props.getCurrentVersion()
        }
    }

    render(){
        return (
            <ItemDetails
                currentVersion={this.props.currentVersion}
                publishedDate={this.props.publishedDate}/>
        );
    }
}

const mapStateToProps = (state, { match }) => {
    const recipeId = match.params.itemId;
    return {
        currentVersion: state.currentVersion,
        publishedDate: state.listRecipes[recipeId].publishedDate
    };
}
const mapDispatchToProps = (dispatch, { match }) => {
    const recipeId = match.params.itemId;
    const updatedDate = match.params.updatedDate;
    return {
        getCurrentVersion: () => dispatch(getCurrentVersion(recipeId, updatedDate))
    };
}
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ItemDetailsContainer)
