import express from 'express';
import isEmpty from 'lodash/isEmpty';
import validator from 'validator';  //验证库
import User from '../models/user';
import bcrypt from 'bcrypt';
//import crypto from 'crypto';
//import Promise from 'bluebird';

let router = express.Router();

const commonValidateInput = (data) => {
    let errors = {};

    if (validator.isEmpty(data.username)) {
        errors.username = "The field is required";
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "The field is required";
    }

    if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "The field is required";
    }

    if (validator.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = "The field is required";
    }

    if (!validator.equals(data.passwordConfirm, data.password)) {
        errors.passwordConfirm = "password must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

const validateInput = (data, otherValidations) => {
    let {errors} = otherValidations(data);

    return User.query({
        where: {email: data.email},
        orWhere: {username: data.username}
    }).fetch().then(user => {
        if (user) {
            if (user.get('email') === data.email) {
                errors.amail = "There is user with such email"
            }

            if (user.get('username') === data.username) {
                errors.amail = "There is user with such username"
            }
        }

        return {
            errors,
            isValid: isEmpty(errors)
        }
    })
};

router.get('/:identifier', (req, res) => {
    User.query({
        select: ["username", "email"],
        where: {email: req.params.identifier},
        orWhere: {username: req.params.identifier}
    }).fetch().then(user => {
        res.json({user});
    })
});

router.post('/', (req, res) => {
    validateInput(req.body, commonValidateInput).then(({errors, isValid}) => {
        if (isValid) {
            const {username, password, email} = req.body;
            const password_digest = bcrypt.hashSync(password, 10);
            // const password_digest = crypto.createHash('md5').update(password).digest('hex');

            User.forge({
                username, password_digest, email
            }, {hasTimestamps: true}).save()
                .then(user => res.json({success: true}))
                .catch(err => res.status(500).json({errors: err}));
        } else {
            res.status(400).json(errors);
        }
    });
});

export default router;