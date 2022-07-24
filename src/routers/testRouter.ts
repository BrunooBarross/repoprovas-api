import { Router } from "express";
import { getTestsByParams, postTest } from "../controller/testController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { validateTestData } from "../middlewares/testMiddleware.js";

const testRouter = Router();

testRouter.post('/test', validateToken, validateTestData, postTest)
testRouter.get('/tests', validateToken, getTestsByParams);

export default testRouter;