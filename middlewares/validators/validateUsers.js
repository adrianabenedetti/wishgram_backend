import {body} from 'express-validator';

export const usersValidation = [
    body('firstName').notEmpty().isString().withMessage("firstName cannot be empty"),
    body('lastName').notEmpty().isString().withMessage("lastName cannot be empty"),
    body('userName').notEmpty().isString().withMessage("userName cannot be empty"),
    body('email').notEmpty().isEmail().withMessage("email cannot be empty"),
    body('password').notEmpty().isString().withMessage("password cannot be empty"),
];