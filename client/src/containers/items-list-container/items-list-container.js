import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRecipes } from '../../actions';

import { withCookbookService } from '../../components/hoc';
import LoadingSpinner from '../../components/loading-spinner';
import ItemsList from '../../components/items-list';

import { compose } from '../../utils';

class ItemsListContainer extends Component {

    componentDidMount(){
        // to avoid wasted request to BD i wait until all my requests will be finished
        if(!this.props.loadingIndicator){
            this.props.getList()
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.loadingIndicator != this.props.loadingIndicator){
            this.props.getList()
        }
    }

    render(){
        return (
            <>
                {
                    this.props.loadingIndicator ?
                    <LoadingSpinner/> :
                    <ItemsList items={this.props.listRecipes}/>
                }
            </>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        listRecipes: state.recipes.listRecipes,
        loadingIndicator: state.recipes.loadingIndicator
    };
}
const mapDispatchToProps = (dispatch, { cookbookService }) => {
    return {
        getList: fetchRecipes(cookbookService, dispatch)
    };
}

export default compose(
    withCookbookService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ItemsListContainer)
