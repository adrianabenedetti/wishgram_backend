import {body} from 'express-validator';

export const validateProduct = [
    body('url').notEmpty().isString().withMessage("url field cannot be empty"),
]