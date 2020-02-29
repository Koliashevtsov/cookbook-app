import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addNewRecipe } from '../../actions';

import FormContainer from '../form-container';

import { compose } from '../../utils';

class AddItemContainer extends Component {
    render(){
        return (
            <FormContainer getFormData={this.props.addNewRecipe}/>
        );
    }
}

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        addNewRecipe: (title, imageUrl, descr) => {
            dispatch(addNewRecipe(title, imageUrl, descr));
            history.push("/")
        }
    };
}
export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(AddItemContainer);
