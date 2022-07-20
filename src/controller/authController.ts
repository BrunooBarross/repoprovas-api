import { Request, Response } from "express";
import * as userService from "../services/userService.js";

export async function signUp(req: Request, res: Response){
    const data = req.body;
    await userService.createUser(data);
    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response){
    const data = req.body;
    const token = await userService.login(data);
    res.status(200).send(token);
}