import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRecipes } from '../../actions';

import { withCookbookService } from '../../components/hoc';
import ItemsList from '../../components/items-list';

import { compose } from '../../utils';

class ItemsListContainer extends Component {

    componentDidMount(){
        console.log('componentDidMount');
        this.props.getList()
    }

    render(){
        console.log('list', this.props.listRecipes);
        return (
            <ItemsList items={this.props.listRecipes}/>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listRecipes: state.listRecipes
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
