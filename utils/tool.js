const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateToolInput(data) {
    let errors = {};

    // Experience
    data.title = !isEmpty(data.name) ? data.name : '';
    data.image = !isEmpty(data.image) ? data.image : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    if (Validator.isEmpty(data.name)) {
        errors.title = 'Tool / tech stack name is required';
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'Description field is required';
    }

    if (!isEmpty(data.url) && (!Validator.isURL(data.url))) {
        errors.url = 'Not a valid URL';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
