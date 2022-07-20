import { NextFunction, Request, Response } from "express";
import { userSchema } from "../schemas/userSchema.js";

export function validateUserSignUp(req: Request, res: Response, next: NextFunction){
    const { error } = userSchema.validate(req.body);

    if (error) {
        throw { type: "unprocessable_entity", message: error.details[0].message }
    }

    next();
}