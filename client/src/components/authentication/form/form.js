import React, { Component } from 'react';
import { connect } from 'react-redux';

import { clearErrorMessage } from '../../../actions';

import ErrorMessage from './error-message';

import { fieldsNotEmpty } from '../../../utils';

import './form.scss';

const Inputs = (props) => {
    const { items, handleChangeTerm, stateNow } = props;
    const changeTerm = (event) => {
        handleChangeTerm(event);
    }
    return (
        <>
            {items.map((item, index) => {
                return (
                    <span className={`input-${item}`} key={index}>
                        <input
                            placeholder={item}
                            name={item}
                            value={stateNow[item] || ''}
                            onChange={changeTerm}/>
                    </span>
                );
            })}
        </>
    );
}

class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            message: ''
        }
        this.changeTerm = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        this.submitForm = (e) => {
            e.preventDefault();
            const { fields } = this.props; // array

            const valid = fieldsNotEmpty(fields, this.state);
            if(!valid){
                this.setState({
                    message: 'All fields are require'
                })
            } else {
                this.props.handleForm(this.state);
                // clear local messageLocal
                this.setState({
                    message: ''
                })
                //clear messageGlobal
                this.props.clearMessage()
            }
        }
    }

    componentDidMount(){
        // clear message from previous messageGlobal
        this.props.clearMessage()

        //define fields from props which will be pass to input value
        const { fields } = this.props;
        const obj = {}
        fields.forEach(item => obj[item] = '');
        // save this fields to state
        this.setState(state => {
            return {
                ...obj
            };
        })
    }

    componentWillUnmount(){
        this.props.clearMessage()
    }

    render(){
        const { fields, label, buttonText } = this.props;
        console.log(this.state);
        return (
            <form className="form" onSubmit={this.submitForm}>
                <div className="input-container">
                    <label>{label}</label>
                    <Inputs items={fields} handleChangeTerm={this.changeTerm} stateNow={this.state}/>
                    <ErrorMessage messageGlobal={this.props.message} messageLocal={this.state.message}/>
                    <button className="submit">{buttonText}</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return { message: state.auth.userAuthError };
}
const mapDispatchToProps = (dispatch) => {
    return { clearMessage: () => dispatch(clearErrorMessage()) };
}
export default connect(mapStateToProps, mapDispatchToProps)(Form);
