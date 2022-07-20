import { Router } from "express";
import { signIn, signUp } from "../controller/authController.js";
import { validateUserSignInSignUp } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post('/sign-up', validateUserSignInSignUp, signUp);
authRouter.post('/sign-in', validateUserSignInSignUp, signIn)

export default authRouter;