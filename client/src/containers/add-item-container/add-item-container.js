import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addNewRecipe } from '../../actions';

import FormContainer from '../form-container';
import { withCookbookService } from '../../components/hoc';

import PostedSpinner from '../../components/posted-spinner';

import { compose } from '../../utils';

class AddItemContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            postMethodSpinner: false
        }
        this.addNewRecipe = (title, imageUrl, descr) => {
            this.props.addNewRecipe(title, imageUrl, descr)
            this.setState({postMethodSpinner: true})

        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.postMethodSpinner != this.state.postMethodSpinner){
            this.props.postAddRecipeResult
                .then(body => {
                    console.log(body);
                    if(body.status == 200){this.props.history.push("/")}
                })
        }
    }
    render(){
        return (
            <>
                {
                    !this.state.postMethodSpinner ?
                    <FormContainer getFormData={this.addNewRecipe}/> :
                    <PostedSpinner/>
                }
            </>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        postAddRecipeResult: state.postAddRecipeResult
    }
}
const mapDispatchToProps = (dispatch, prevProps) => {
    const { cookbookService } = prevProps;
    return {
        addNewRecipe: (title, imageUrl, descr) => {
            dispatch(addNewRecipe(cookbookService, dispatch)(title, imageUrl, descr));
        }
    };
}
export default compose(
    withRouter,
    withCookbookService(),
    connect(mapStateToProps, mapDispatchToProps)
)(AddItemContainer);
