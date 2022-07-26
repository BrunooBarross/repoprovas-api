import { Request, Response } from "express";
import * as categoryService from "../services/categoryService.js";

export async function getAllCategories(req: Request, res: Response){
    const categories = await categoryService.getCategories();
    res.status(200).send({categories});
}