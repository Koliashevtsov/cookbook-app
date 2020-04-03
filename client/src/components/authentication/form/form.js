import React, { Component } from 'react';

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
                            value={stateNow[item]}
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
            username: '',
            email: '',
            password: ''
        }
        this.changeTerm = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        this.submitForm = (e) => {
            e.preventDefault()
            this.props.handleForm(this.state)
        }
    }

    render(){
        const { fields, label, buttonText } = this.props;
        return (
            <form className="form" onSubmit={this.submitForm}>
                <div className="input-container">
                    <label>{label}</label>
                    <Inputs items={fields} handleChangeTerm={this.changeTerm} stateNow={this.state}/>
                    <button className="submit">{buttonText}</button>
                </div>
            </form>
        );
    }
}
export default Form;
