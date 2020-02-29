import React, { Component } from 'react';

import './form-component.scss';

const FormComponent = (props) => {
    const { titleValue, urlValue, descriptionsValue, onChangeTitle, onChangeUrl,
         onChangeDescriptions, onSubmitForm, onCancelForm } = props;
    return (
        <div className="form-component">
            <div className="form-component-container">
                <form>
                    <div className="inputs-wrapper">
                        <p>Recipe title:</p>
                        <input className="input-title" placeholder="Recipe title"
                            onChange={onChangeTitle} value={titleValue}/>
                        <p>Image url:</p>
                        <input className="input-image-url" placeholder="https://"
                            onChange={onChangeUrl} value={urlValue}/>
                        <p>Description</p>
                        <textarea className="textarea-description"
                            placeholder="Description" onChange={onChangeDescriptions}
                            value={descriptionsValue}>
                        </textarea>
                    </div>
                </form>
                <div className="form-components-buttons">
                    <button className="submit" onClick={onSubmitForm}>OK</button>
                    <button className="cancel" onClick={onCancelForm}>Cancel</button>
                </div>
            </div>
        </div>
    );

}
export default FormComponent;
