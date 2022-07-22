import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export async function postTest(req: Request, res: Response){
    const data = req.body;
    await testService.createTests(data);
    res.sendStatus(201);
}