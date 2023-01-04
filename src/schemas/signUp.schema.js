import joi from "joi";

export const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(5),
    name: joi.string().required(),
    picture_url: joi.string().uri().required()
})