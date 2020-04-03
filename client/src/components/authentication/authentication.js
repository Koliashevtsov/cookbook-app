import React, { Component } from 'react';

import AuthenHeader from './authen-header';
import Register from './register';
import Login from './login';

import './authentication.scss';

class Authentication extends Component {
    constructor(props){
        super(props)
        this.state = {
            tab: 'register'
        }
        this.handleTab = (marker) => {
            this.setState({
                tab: marker
            })
        }
    }
    render(){
        const { submitRegister, submitLogin } = this.props;
        return (
            <div className="authentication">
                <AuthenHeader handleTab={this.handleTab} tab={this.state.tab}/>
                {
                    this.state.tab == 'register' ?
                    <Register
                        fields={['username', 'email', 'password']}
                        submitRegister={submitRegister}/> :
                    <Login
                        fields={['email', 'password']}
                        submitLogin={submitLogin}/>
                }
            </div>
        );
    }
}
export default Authentication;
