import { Router } from "express";

import {
  deletePost,
  getPosts,
  publishPost,
} from "../controllers/posts.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { deletePostValidation } from "../middlewares/posts/deletePostValidation.middleware.js";
import {
  validateBody,
  validateParams,
} from "../middlewares/schema.middleware.js";
import { postSchema } from "../schemas/post.schema.js";
import { postIdParamSchema } from "../schemas/postIdParam.schema.js";

const router = Router();

router.get("/timeline", authValidation, getPosts);
router.post(
  "/timeline",
  authValidation,
  validateBody(postSchema, "timeline"),
  publishPost
);
router.delete(
  "/timeline/:post_id",
  authValidation,
  validateParams(postIdParamSchema, "post_id"),
  deletePostValidation,
  deletePost
);

export default router;
