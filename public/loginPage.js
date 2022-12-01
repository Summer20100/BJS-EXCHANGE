'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = data => ApiConnector.login(data, serverResponse => {
    if (!serverResponse.success) {
        return userForm.setLoginErrorMessage(serverResponse.error);
    }
    location.reload();
});

userForm.registerFormCallback = data => ApiConnector.login(data, serverResponse => {
    if (!serverResponse.success) {
        return userForm.setRegisterErrorMessage(serverResponse.error);
    }
    location.reload();
});