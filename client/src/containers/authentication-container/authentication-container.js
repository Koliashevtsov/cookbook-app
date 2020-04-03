import React, { Component } from 'react';
import { connect } from 'react-redux';

import { register, login } from '../../actions';

import Authentication from '../../components/authentication';
import { withCookbookService } from '../../components/hoc';

import { compose } from '../../utils';

class AuthenticationContainer extends Component {
    render(){
        return (
            <Authentication
                submitRegister={this.props.submitRegister}
                submitLogin={this.props.submitLogin}/>
        );
    }
}
const mapDispatchToProps = (dispatch, { cookbookService }) => {
    return {
        submitRegister: (formState) => dispatch(register(cookbookService)(formState)),
        submitLogin: (formState) => dispatch(login(cookbookService)(formState))
    };
}
export default compose(
    withCookbookService(),
    connect(null, mapDispatchToProps)
)(AuthenticationContainer)
