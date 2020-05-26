import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import AuthenHeader from './authen-header';
import Register from './register';
import Login from './login';

import { compose } from '../../utils';

import './authentication.scss';

class Authentication extends Component {
    constructor(props){
        super(props)
        this.state = {
            tab: ''
        }
    }
    componentDidMount(){
        const pathName = this.props.location.pathname;
        const newTab = pathName.slice(1);
        this.setState({
            tab: newTab
        })
    }
    render(){
        const { submitRegister, submitLogin } = this.props;
        return (
            <div className="authentication">
                <AuthenHeader tab={this.state.tab}/>
                {
                    this.state.tab == 'sign-up' &&
                    <Register
                        fields={['username', 'email', 'password']}
                        submitRegister={submitRegister}/>
                }
                {this.state.tab == 'sign-in' &&
                    <Login
                        fields={['email', 'password']}
                        submitLogin={submitLogin}/>

                }
            </div>
        );
    }
}
export default compose(
    withRouter
)(Authentication) ;
