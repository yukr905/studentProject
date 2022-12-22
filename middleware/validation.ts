import {body} from "express-validator"

export const loginValidation =[
    body("email", "неверный формат почты").isEmail(),
    body("password", "пароль должен быть длинне 5 символов").isLength({min:5})
]
export const registerValidation =[
    body("name","длинне 3 символов").isLength({min:3}),
    body("email","неверный формат почты").isEmail(),
    body("password1","пароль должен быть длинне 5 символов").isLength({min:5}),
    body("password2","пароль должен быть длинне 5 символов").isLength({min:5}),
]

