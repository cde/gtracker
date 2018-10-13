const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateCreateInput(data){
    let errors = {};
    console.log(data)

    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirmation = !isEmpty(data.password_confirmation) ? data.password_confirmation : '';

    if(!Validator.isLength(data.first_name, { min: 2, max: 30 })){
        errors.firstName = 'First name must be between 2 and 30 characters';
    }
    if(!Validator.isLength(data.last_name, {min: 2, max: 30 })){
        errors.lastName = 'Last name must be between 2 and 30 characters';
    }
    if(Validator.isEmpty(data.first_name) || Validator.isEmpty(data.last_name)) {
        errors.name = 'First Name and/or Last Name is required';
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
        errors.password = 'Password must be between 9 and 30 characters';
    }
    if ( data.password_confirmation && !Validator.equals(data.password, data.password_confirmation)) {
        errors.password_confirmation = 'Password confirmation much match password';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}