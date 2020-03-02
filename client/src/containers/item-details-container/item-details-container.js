import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getCurrentVersion, deleteItemVersion } from '../../actions';

import ItemDetails from '../../components/item-details';
import Message from '../../components/message';

import { compose } from '../../utils';

class ItemDetailsContainer extends Component {
    constructor(props){
        super(props)

        this.onClickEdit = () => {
            const recipeId = this.props.match.params.itemId;
            const updatedDate = this.props.currentVersion.updatedDate;
            this.props.history.push(`/edit-item/${recipeId}/${updatedDate}`)
        }
    }

    componentDidMount(){
        this.props.getCurrentVersion()
    }

    componentDidUpdate(prevProps){
        console.log('currentVersion', this.props.currentVersion);
        console.log('previousVersions', this.props.previousVersions);

        if(this.props.match.params.updatedDate !== prevProps.match.params.updatedDate){
            console.log('componentDidUpdate, getCurrentVersion()');
            this.props.getCurrentVersion()
        }


        // updated path after deleted itemVersion
        if(prevProps.currentVersion !== this.props.currentVersion){
            // when i remove the last itemVersion this.props.currentVersion is undefined
            // so i do review to work
            if(this.props.currentVersion){
                if(this.props.match.params.updatedDate !== this.props.currentVersion.updatedDate){
                    console.log('pushed in path')
                    this.props.history.push(`/view-page/${this.props.currentVersion.parentId}/${this.props.currentVersion.updatedDate}`)

                }
            }
        }
    }


    render(){
        return (
            <>
                {

                    !this.props.currentVersion ? <Message/> :
                    <ItemDetails
                        currentVersion={this.props.currentVersion}
                        publishedDate={this.props.publishedDate}
                        onClickEdit={this.onClickEdit}
                        onClickDelete={this.props.onClickDelete}/>

                }
            </>
        );
    }
}

const mapStateToProps = (state, { match }) => {
    const recipeId = match.params.itemId;
    return {
        currentVersion: state.currentVersion,
        publishedDate: state.listRecipes[recipeId].publishedDate,
    };
}
const mapDispatchToProps = (dispatch, { match, history }) => {
    const recipeId = match.params.itemId;
    const updatedDate = match.params.updatedDate;
    return {
        getCurrentVersion: () => dispatch(getCurrentVersion(recipeId, updatedDate)),
        onClickDelete: () => {
            dispatch(deleteItemVersion(recipeId, updatedDate, history))
        }
    };
}
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ItemDetailsContainer)
