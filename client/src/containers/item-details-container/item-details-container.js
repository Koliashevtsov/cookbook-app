import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getCurrentRecipe, getCurrentVersion, deleteItemVersion } from '../../actions';

import { withCookbookService } from '../../components/hoc';

import ItemDetails from '../../components/item-details';
import Message from '../../components/message';
import LoadingSpinner from '../../components/loading-spinner';

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
        this.props.getCurrentRecipe()
        this.props.getCurrentVersion()
    }

    componentDidUpdate(prevProps){
            }
        }
    }


    render(){
        return (
            <>{
                this.props.loadingIndicator ? <LoadingSpinner/> :
                !this.props.currentRecipe ? <Message/> : // its no possible because in this case i delete whole recipe
                <ItemDetails
                        currentVersion={this.props.currentVersion}
                        publishedDate={this.props.currentRecipe.publishedDate}
                        onClickEdit={this.onClickEdit}
                        onClickDelete={this.props.onClickDelete}/>}
            </>
        );
    }
}


    };
}
const mapDispatchToProps = (dispatch, prevProps) => {
    const { match, cookbookService } = prevProps;
    const recipeId = match.params.recipeId;
    const versionId = match.params.versionId;
    return {
        getCurrentRecipe: () => dispatch(getCurrentRecipe(recipeId)),
        getCurrentVersion: () => dispatch(getCurrentVersion(versionId)),
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
