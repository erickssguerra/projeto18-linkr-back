import { Router } from "express";
import usersRouter from "./users.routes.js";

import postsRoute from './posts.route.js'; 

const router = Router();

router.use(usersRouter);

router.use(postsRoute);

export default router;