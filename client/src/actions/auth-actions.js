const userRegistration = (token) => {
    return {
        type: 'USER_REGISTRATION_SUCCESS',
        payload: token
    };
}

const userRegistrationError = (err) => {
    return {
        type: 'USER_REGISTRATION_FAILURE',
        payload: err
    };
}

const clearErrorMessage = () => {
    return {
        type: 'CLEAR_ERROR_MESSAGE'
    };
}

const userLogin = (token) => {
    return {
        type: 'USER_LOGGED_SUCCESS',
        payload: token
    };
}

const userLoginError = (err) => {
    return {
        type: 'USER_LOGGED_FAILURE',
        payload: err
    };
}

const register = (cookbookService) => (formState) => (dispatch) => {
    cookbookService.register(formState)
        .then(res => {
            if(res.status == 200) dispatch(userRegistration(res.data.token));
            // redirect to previous url;
            window.history.back();
        })
        .catch(err => dispatch(userRegistrationError(err)))
}
const login = (cookbookService) => (formState) => (dispatch) => {
    cookbookService.login(formState)
        .then(res => {
            if(res.status == 200) dispatch(userLogin(res.data.token));
            // redirect to previous url;
            window.history.back();
        })
        .catch(err => dispatch(userLoginError(err)))
}
const logout = (history) => () => {
    history.push('/')
    return {
        type: 'USER_LOGOUT_SUCCESS'
    };
}
export {
    register,
    login,
    logout,
    clearErrorMessage
}
