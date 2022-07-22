import { Request, Response } from "express";
import * as categorieService from "../services/categorieService.js";

export async function getAllCategories(req: Request, res: Response){
    const categories = await categorieService.getCategories();
    res.status(200).send(categories);
}