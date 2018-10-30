const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.full_name = !isEmpty(data.full_name) ? data.full_name : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    // Profile
    if(Validator.isEmpty(data.full_name)) {
        errors.full_name = 'Full Name is required';
    }

    if(!Validator.isLength(data.full_name, { min: 2, max: 60 })){
        errors.full_name = 'Full name must be between 2 and 60 characters';
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
    }

    if (!isEmpty(data.website) && (!Validator.isURL(data.website))) {
        errors.website = 'Not a valid URL';
    }

    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
