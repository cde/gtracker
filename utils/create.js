const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateCreateInput(data){
    let errors = {};
    console.log(data)

    data.username = !isEmpty(data.username) ? data.username : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirmation = !isEmpty(data.password_confirmation) ? data.password_confirmation : '';

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    }
    if (!Validator.isLength(data.username, { min: 3, max: 40 })) {
        errors.username = 'Username needs to be between 3 and 40 characters';
    }
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    }
    if(data.email && !Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    if (Validator.isEmpty(data.password_confirmation)) {
        errors.password_confirmation = 'Password Confirmation field is required';
    }
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = 'Password must be between 8 and 30 characters';
    }
    if ( data.password_confirmation && !Validator.equals(data.password, data.password_confirmation)) {
        errors.password_confirmation = 'Password confirmation much match password';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}