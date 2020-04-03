import React from 'react';

import Form from '../form';

const Login = ({ fields, submitLogin }) => {
    return (
        <div>
            <Form
                fields={fields}
                label="Please, enter to your account"
                buttonText="Sign In"
                handleForm={submitLogin}/>
        </div>
    )
}
export default Login
