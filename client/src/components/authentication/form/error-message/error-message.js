import React from 'react';

import './error-message.scss';

const ErrorMessage = (props) => {
    const { messageGlobal, messageLocal } = props;
    let message = '';
    messageGlobal ? message = messageGlobal : null;
    messageLocal ? message = messageLocal : null
    return (
        <span className={`error-message ${!message ? "hidden" : ""}`}>{message}</span>
    );
}
export default ErrorMessage;
