import { Router } from "express";
import usersRouter from "./users.routes.js";

import postsRoute from './posts.route.js'; 

import hashsRouter from "./hashs.routes.js";

const router = Router();

router.use(usersRouter);

router.use(postsRoute);

router.use(hashsRouter)

export default router;