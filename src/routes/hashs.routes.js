import { Router } from "express";
import { getPosts, getHashtags } from "../controllers/hash.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { hashtagValidation } from "../middlewares/hashs/hashtagValidation.middleware.js";
import { validateParams } from "../middlewares/schema.middleware.js";
import { hashtagParamSchema } from "../schemas/hashtagParam.schema.js";

const hashsRouter = Router();

hashsRouter.get(
  "/hashtag/:hashtag",
  authValidation,
  validateParams(hashtagParamSchema, "hashtag"),
  hashtagValidation,
  getPosts
);

hashsRouter.get("/hashtags", getHashtags);

export default hashsRouter;
