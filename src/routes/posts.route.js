import { Router } from "express";

import { getPosts, publishPost } from "../controllers/posts.controllers.js";
import { validateBody } from "../middlewares/schema.middleware.js";
import { postSchema } from "../schemas/post.schema.js";

const router = Router();

router.get("/timeline", getPosts);
router.post("/timeline", validateBody(postSchema, "timeline"), publishPost);

export default router;
