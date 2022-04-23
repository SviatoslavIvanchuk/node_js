import * as Joi from 'joi';

import { commonValidator } from '../common/common.validator';

export const authValidator = {
    login: Joi.object({
        email: commonValidator.emailValidator.message('Email or Password not valid').trim(),
        password: Joi.string().required().min(8).message('Password or Email not Valid')
            .trim(),
    }),
    email: Joi.object({
        email: commonValidator.emailValidator.message('Email not valid').trim(),
    }),
    password: Joi.object({
        password: Joi.string().required().min(8).message('Password not Valid')
            .trim(),
    }),
};
