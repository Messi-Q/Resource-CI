import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
    let errors = {};

    if(validator.isEmpty(data.identifier)){
        errors.identifier = "This username/email is required";
    }

    if(validator.isEmpty(data.password)){
        errors.password = "This password is required";
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
};

export default validateInput;