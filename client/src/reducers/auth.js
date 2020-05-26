const parseJwtToken = (state, action) => {
    const jwtToken = action.payload;
    const payload = JSON.parse(window.atob(jwtToken.split(".")[1]));
    const name = payload.name;
    const email = payload.email;
    const expireDate = payload.exp;
    return {
        ...state,
        jwtToken: jwtToken,
        name: name,
        email: email,
        expireDate: expireDate
    };
}
const deleteJwt = (state, action) => {
    return {
        ...state,
        jwtToken: null,
        name: '',
        email: '',
        expireDate: null
    };
}
const catchErrorRegistration = (state, action) => {
    // handling error by axios doc
    const error = action.payload.response.data;
    // get validator's message
    const errorMessage = error.errors.email.message;
    return {
        ...state,
        userAuthError: errorMessage
    };
}
const catchErrorLogin = (state, action) => {
    const errorMessage = action.payload.response.data.message;
    return {
        ...state,
        userAuthError: errorMessage
    };
}
const clearError = (state, action) => {
    return {
        ...state,
        userAuthError: null
    };
}


const auth = (state, action) => {
    if(state === undefined){
        return {
            jwtToken: null,
            name: '',
            email: '',
            expireDate: null,
            userAuthError: null,
        };
    }
    switch (action.type) {
        case 'USER_REGISTRATION_SUCCESS':
            return parseJwtToken(state, action);
        case 'USER_REGISTRATION_FAILURE':
            return catchErrorRegistration(state, action);
        case 'CLEAR_ERROR_MESSAGE':
            return clearError(state, action);
        case 'USER_LOGGED_SUCCESS':
            return parseJwtToken(state, action);
        case 'USER_LOGGED_FAILURE':
            return catchErrorLogin(state, action);
        case 'USER_LOGOUT_SUCCESS':
            return deleteJwt(state, action);
        default:
            return state;
    }
}
export default auth;
