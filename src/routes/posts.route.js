import { Router } from "express";

import { getPosts, publishPost } from "../controllers/posts.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { validateBody } from "../middlewares/schema.middleware.js";
import { postSchema } from "../schemas/post.schema.js";

const router = Router();

router.get("/timeline", authValidation, getPosts);
router.post("/timeline", authValidation, validateBody(postSchema, "timeline"), publishPost);

export default router;
