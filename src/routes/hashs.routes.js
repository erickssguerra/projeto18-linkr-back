import { Router } from "express";
import { getPosts } from "../controllers/hash.controllers.js";
import { hashtagValidation } from "../middlewares/hashs/hashtagValidation.middleware.js";
import { validateParams } from "../middlewares/schema.middleware.js";
import { hashtagParamSchema } from "../schemas/hashtagParam.schema.js";

const hashsRouter = Router();

hashsRouter.get(
  "/hashtag/:hashtag",
  validateParams(hashtagParamSchema, "hashtag"),
  hashtagValidation,
  getPosts
);

export default hashsRouter;
