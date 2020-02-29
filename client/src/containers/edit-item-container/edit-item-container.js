import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addNewVersion } from '../../actions';

import FormContainer from '../form-container';

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
        currentVersion: state.currentVersion
    };
}
const mapDispatchToProps = (dispatch, { history }) => {
    return {
        addNewVersion: (title, imageUrl, descr) => {
            dispatch(addNewVersion(title, imageUrl, descr));
            history.push("/")
        }
    };
}
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(EditItemContainer);
