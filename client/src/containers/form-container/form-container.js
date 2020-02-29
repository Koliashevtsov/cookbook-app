import React, { Component } from 'react';

import FormComponent from '../../components/form-component';

class FormContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            imageUrl: '',
            descriptions: ''
        }
        // write data to state from nested FormComponent
        this.onChangeTitle = (e) => this.setState({title: e.target.value})
        this.onChangeUrl = (e) => this.setState({imageUrl: e.target.value})
        this.onChangeDescriptions = (e) => this.setState({descriptions: e.target.value})

        this.onSubmitForm = () => {
            // send data to component above
            this.props.getFormData( this.state.title,
                                    this.state.imageUrl,
                                    this.state.descriptions)
        }

        this.onCancelForm = () => {
            window.history.back()
        }
    }

    componentDidMount(){
        // i will get data from component above and write it in state
        // in case to initializate this.state
        // i must receive define data when i use FormContainer in EditItemContainer
        // but when i use it in AddItemContainer data are undefined

        if(this.props.title || this.props.imageUrl || this.props.descriptions){
            this.setState({
                title: this.props.title,
                imageUrl: this.props.imageUrl,
                descriptions: this.props.descriptions
            })
        }
    }

    render(){
        const { title, imageUrl, descriptions } = this.state;
        return (
            <FormComponent
                titleValue={title} urlValue={imageUrl}
                descriptionsValue={descriptions}
                onChangeTitle={this.onChangeTitle}
                onChangeUrl={this.onChangeUrl}
                onChangeDescriptions={this.onChangeDescriptions}
                onSubmitForm={this.onSubmitForm}
                onCancelForm={this.onCancelForm}/>
        );
    }
}
export default FormContainer;
