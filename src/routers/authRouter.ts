import { Router } from "express";
import { signUp } from "../controller/authController.js";
import { validateUserSignUp } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post('/sign-up', validateUserSignUp, signUp);

export default authRouter;