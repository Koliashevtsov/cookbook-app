import React, { Component } from 'react';

import './collapse.scss';

class Collapse extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false
        }

        this.handleClick = () => {
            this.setState(state => {
                return {
                    isOpen: !this.state.isOpen
                };
            })
        }
    }


    render(){
        return (
            <div className="collapse">
                <button onClick={this.handleClick}>
                    { this.state.isOpen ? "Hide prev versions" :
                     "Show prev versions" }
                </button>
                { this.state.isOpen ? this.props.children : null}
            </div>
        );
    }
}
export default Collapse;
