import { Request, Response } from "express";
import * as userService from "../services/userService.js";

export async function signUp(req: Request, res: Response){
    const data = req.body;
    await userService.createUser(data);
    res.sendStatus(201);
}