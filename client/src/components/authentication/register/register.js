import React from 'react';

import Form from '../form';

const Register = ({ fields, submitRegister, errorMessage }) => {
    return (
        <div className="register">
            <Form
                fields={fields}
                label="Please, create your account"
                buttonText="Sing Up"
                handleForm={submitRegister}/>
        </div>
    );
}
export default Register;
