import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './header.scss';

import { logout } from '../../actions';

import UserIcon from '../icons/user-icon';
import LinkC from '../link-c';

import { compose } from '../../utils/';

class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            activeUrl: '/'
        }
        this.handleClick = (to) => {
            this.setState({activeUrl: to})
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.location.pathname != this.props.location.pathname){
            this.setState({
                activeUrl: this.props.location.pathname
            })

            if(this.props.location.pathname == '/sign-out'){
                this.props.logOut()
            }
        }
    }

    render(){
        const { expireDate } = this.props;
        const { activeUrl } = this.state;
        return (
            <div className="header">
                <div className="header-container">
                    <LinkC link={"/"} isActive={activeUrl}>Home</LinkC>
                        {
                            expireDate > Date.now()  &&
                            <LinkC link={"/add-item"} isActive={activeUrl}>Add new</LinkC>
                        }
                    <div className="auth">
                        {
                            expireDate < Date.now()  ?
                            <>
                                <LinkC link={"/sign-up"} isActive={activeUrl}>Sign Up</LinkC>
                                <LinkC link={"/sign-in"} isActive={activeUrl}>Sign In</LinkC>
                            </> :
                            <LinkC link={"/sign-out"} isActive={activeUrl}>Sign Out</LinkC>
                        }
                        <span className="user-icon-wrapper">
                            <UserIcon/>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        expireDate: state.auth.expireDate
    };
}
const mapDispatchToProps = (dispatch, { history }) => {
    return {
        logOut: () => dispatch(logout(history)())
    };
}
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Header) ;
