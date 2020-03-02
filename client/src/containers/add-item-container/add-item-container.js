import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addNewRecipe } from '../../actions';

import FormContainer from '../form-container';
import { withCookbookService } from '../../components/hoc';

import { compose } from '../../utils';

class AddItemContainer extends Component {
    render(){
        return (
            <FormContainer getFormData={this.props.addNewRecipe}/>
        );
    }
}

const mapDispatchToProps = (dispatch, prevProps) => {
    const { history, cookbookService } = prevProps;
    return {
        addNewRecipe: (title, imageUrl, descr) => {
            dispatch(addNewRecipe(cookbookService)(title, imageUrl, descr));
            history.push("/")
        }
    };
}
export default compose(
    withRouter,
    withCookbookService(),
    connect(null, mapDispatchToProps)
)(AddItemContainer);
