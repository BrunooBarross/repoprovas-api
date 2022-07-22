import { Router } from "express";
import { postTest } from "../controller/testController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { validateTestData } from "../middlewares/testMiddleware.js";

const testRouter = Router();

testRouter.post('/test', validateToken, validateTestData, postTest)

export default testRouter;