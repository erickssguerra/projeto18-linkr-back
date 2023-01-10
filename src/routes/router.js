import { Router } from "express";
import usersRouter from "./users.routes.js";
import postsRoute from "./posts.route.js";
import hashsRouter from "./hashs.routes.js";
import likesRouter from "./likes.routes.js";
import followersRouter from "./followers.routes.js";

const router = Router();

router.use(usersRouter);

router.use(postsRoute);

router.use(hashsRouter);

router.use(likesRouter);

router.use(followersRouter);

export default router;
