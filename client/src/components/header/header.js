import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './header.scss';

import UserIcon from '../icons/user-icon';
import LinkComponent from '../link-component';

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
        if(prevProps.location.pathname != this.props.location.pathname)
        this.setState({
            activeUrl: this.props.location.pathname
        })
    }

    render(){
        return (
            <div className="header">
                <div className="header-container">
                    <LinkComponent link={"/"} isActive={this.state.activeUrl} >
                        Home
                    </LinkComponent>
                    <LinkComponent link={"/add-item"} isActive={this.state.activeUrl} >
                        Add new
                    </LinkComponent>
                    <div className="auth">
                        <LinkComponent link={"/sign-up"} isActive={this.state.activeUrl}>
                            Sign Up
                        </LinkComponent>
                        <LinkComponent link={"/sign-in"} isActive={this.state.activeUrl}>
                            Sign In
                        </LinkComponent>

                        <span className="user-icon-wrapper">
                            <UserIcon/>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
export default compose(
    withRouter
)(Header) ;
