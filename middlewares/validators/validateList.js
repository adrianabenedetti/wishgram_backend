import {body} from "express-validator"

export const validateList = [
    body('title').notEmpty().isString().withMessage("title cannot be empty")
]