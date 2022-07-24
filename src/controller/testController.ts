import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export async function postTest(req: Request, res: Response){
    const data = req.body;
    await testService.createTests(data);
    res.sendStatus(201);
}

export async function getTestsByParams(req: Request, res: Response){
    const {groupBy} = req.query;
    const tests = await testService.getTestsByQueryParams(groupBy.toString());
    res.status(200).send({tests: tests});
}