import { Router } from "express";
import { getAllCategories } from "../controller/categoriesController.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get('/categories', validateToken, getAllCategories);

export default categoriesRouter;