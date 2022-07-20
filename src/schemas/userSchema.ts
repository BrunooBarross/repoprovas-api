import joi from "joi";

const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    passwordConfirmation: joi.ref('password')
});

export { userSchema };