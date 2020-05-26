import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addNewVersion } from '../../actions';

import FormContainer from '../form-container';
import { withCookbookService } from '../../components/hoc';

import { compose } from '../../utils';

class EditItemContainer extends Component {
    render(){
        const { title, imageUrl, descriptions } = this.props.currentVersion;
        return (
            <FormContainer title={title} imageUrl={imageUrl}
                descriptions={descriptions}
                getFormData={this.props.addNewVersion}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentVersion: state.recipes.currentVersion
    };
}
const mapDispatchToProps = (dispatch, prevProps) => {
    const { history, match, cookbookService } = prevProps;
    const recipeId = match.params.recipeId;
    return {
        addNewVersion: (title, imageUrl, descr) => {
            dispatch(addNewVersion(cookbookService)(title, imageUrl, descr, recipeId));
            history.push("/")
        }
    };
}
export default compose(
    withRouter,
    withCookbookService(),
    connect(mapStateToProps, mapDispatchToProps)
)(EditItemContainer);
