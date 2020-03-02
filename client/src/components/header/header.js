import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

import UserIcon from '../icons/user-icon';
import LinkComponent from '../link-component';

class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            isActive: '/'
        }
        this.handleClick = (to) => {
            this.setState({isActive: to})
        }
    }

    render(){
        return (
            <div className="header">
                <div className="header-container">
                    <LinkComponent link={"/"} isActive={this.state.isActive} onClick={this.handleClick}>
                        Home
                    </LinkComponent>
                    <LinkComponent link={"/add-item"} isActive={this.state.isActive} onClick={this.handleClick}>
                        Add new
                    </LinkComponent>

                    <span className="user-icon-wrapper">
                        <UserIcon/>
                    </span>
                </div>
            </div>
        );
    }
}
export default Header;
