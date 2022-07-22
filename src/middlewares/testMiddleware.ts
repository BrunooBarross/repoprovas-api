import { NextFunction, Request, Response } from "express";
import { testSchema } from "../schemas/testSchema.js";

export function validateTestData(req: Request, res: Response, next: NextFunction){
    const { error } = testSchema.validate(req.body);

    if (error) {
        throw { type: "unprocessable_entity", message: error.details[0].message }
    }

    next();
}