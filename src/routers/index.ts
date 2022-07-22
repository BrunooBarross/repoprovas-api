import { Router } from "express"
import authRouter from "./authRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import testRouter from "./testRouter.js";

const router = Router();

router.use(authRouter);
router.use(categoriesRouter);
router.use(testRouter)

export default router;