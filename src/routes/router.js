import { Router } from "express";
import usersRouter from "./users.routes.js";
import postsRoute from "./posts.route.js";
import hashsRouter from "./hashs.routes.js";
import likesRouter from "./likes.routes.js";
import followersRouter from "./followers.routes.js";
import repostsRouter from "./reposts.routes.js";
import commentsRouter from "./comments.routes.js";


const router = Router();

router.use(usersRouter);

router.use(postsRoute);

router.use(hashsRouter);

router.use(likesRouter);

router.use(followersRouter);

router.use(repostsRouter);

router.use(commentsRouter);

export default router;
