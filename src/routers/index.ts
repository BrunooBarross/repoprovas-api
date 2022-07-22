import { Router } from "express"
import authRouter from "./authRouter.js";
import categoriesRouter from "./categoriesRouter.js";

const router = Router();

router.use(authRouter);
router.use(categoriesRouter);

export default router;