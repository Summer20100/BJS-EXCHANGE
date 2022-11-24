'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = data => ApiConnector.login(data, callback => {
    //response.success;
    if (callback !== true) {
        return userForm.setLoginErrorMessage(callback.error);
    }
    location.reload();
});

userForm.registerFormCallback = data => ApiConnector.login(data, callback => {
    if (callback !== true) {
        return userForm.setRegisterErrorMessage(callback.error);
    }
    location.reload();
});