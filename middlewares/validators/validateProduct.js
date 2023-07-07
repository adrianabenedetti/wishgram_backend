import {body} from 'express-validator';

export const validateProduct = [
    body('title').notEmpty().isString().withMessage("title cannot be empty"),
    body('price').isNumeric().withMessage("price must be a number")
]