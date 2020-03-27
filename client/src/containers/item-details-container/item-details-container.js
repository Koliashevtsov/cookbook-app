import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getCurrentVersion, deleteItemVersion } from '../../actions';

import { withCookbookService } from '../../components/hoc';

import ItemDetails from '../../components/item-details';
import Message from '../../components/message';

import { compose } from '../../utils';

class ItemDetailsContainer extends Component {
    constructor(props){
        super(props)

        this.onClickEdit = () => {
            const recipeId = this.props.match.params.recipeId;
            const versionId = this.props.currentVersion._id;
            this.props.history.push(`/edit-item/${recipeId}/${versionId}`)
        }
    }

    componentDidMount(){
        this.props.getCurrentVersion()
    }

    componentDidUpdate(prevProps){
        console.log('currentVersion', this.props.currentVersion);

        if(this.props.match.params.versionId !== prevProps.match.params.versionId){
            console.log('componentDidUpdate, getCurrentVersion()');
            this.props.getCurrentVersion()
        }


        // updated path after deleted itemVersion
        if(prevProps.currentVersion.versionId !== this.props.currentVersion.versionId){
            // when i remove the last itemVersion this.props.currentVersion is undefined
            // so i do review to work
            if(this.props.currentVersion){
                if(this.props.match.params.versionId !== this.props.currentVersion.versionId){
                    const recipeId = this.props.match.params.recipeId;
                    this.props.history.push(`/view-page/${recipeId}/${this.props.currentVersion.versionId}`)
                    console.log('pusheeeeeeeeeeeeeeeeeeeed');
                }
            }
        }
    }


    render(){
        console.log('hello');
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
    const recipeId = match.params.recipeId;
    return {
        currentVersion: state.currentVersion,
        publishedDate: state.listRecipes.find(item => item._id == recipeId).publishedDate,
    };
}
const mapDispatchToProps = (dispatch, prevProps) => {
    const { match, cookbookService } = prevProps;
    const recipeId = match.params.recipeId;
    const versionId = match.params.versionId;
    return {
        getCurrentVersion: () => dispatch(getCurrentVersion(recipeId, versionId)),
        onClickDelete: () => {
            dispatch(deleteItemVersion(cookbookService)(recipeId, versionId))
        }
    };
}
export default compose(
    withRouter,
    withCookbookService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ItemDetailsContainer)
