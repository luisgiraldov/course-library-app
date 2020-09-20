/***
 * `nameValidator` function callback
 * @returns {Boolean} value to check if the validation passed or not 
 * @param {String} value of the input field
 * Check the name field that it is not empty and doesn't have invalid characters
***/
function nameValidator(value){
    const nameRegex = /[A-Za-z]{2,}/gm;
    const isValidName = nameRegex.test(value);
    return isValidName;
}

/***
 * `emailValidator` function callback
 * @returns {Boolean} value to check if the validation passed or not 
 * @param {String} value of the input field
 * Check the email field that it is not empty and doesn't have invalid characters
 ***/
function emailValidator(value){
    // eslint-disable-next-line
    const emailRegex = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
    const isValidEmail = emailRegex.test(value);
    return isValidEmail;
}

/***
 * `passwordValidator` function callback
 * @returns {Boolean} value to check if the validation passed or not 
 * @param {String} value of the input field
 * Check the password field that it is not empty and if it has a combination of numbers, uppercase letters, lowercase letters, and special charaters such as @!+
***/
function passwordValidator(value) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm;
    const isValidPassword = passwordRegex.test(value);
    return isValidPassword;
}

/***
 * `passwordValidator` function callback
 * @returns {Boolean} value to check if the validation passed or not 
 * @param {String} value of the input field
 * Check the confirmPassword field to see if the password is correctly typed
***/
function confirmPasswordValidator(password, confirmPassword) {
    const passwordMatch = password === confirmPassword;
    return passwordMatch;
}

export default {
    nameValidator,
    emailValidator,
    passwordValidator,
    confirmPasswordValidator
};
