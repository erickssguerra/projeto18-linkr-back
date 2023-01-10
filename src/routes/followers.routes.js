import { Router } from "express";
import {
  getFollowers,
  getFollowersById,
} from "../controllers/followers.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { validateParams } from "../middlewares/schema.middleware.js";
import { followerIdParamSchema } from "../schemas/followerIdParam.schema.js";

const followersRouter = Router();

followersRouter.get("/followers", authValidation, getFollowers);

followersRouter.get(
  "/followers/:id",
  authValidation,
  validateParams(followerIdParamSchema, "followerId"),
  getFollowersById
);

export default followersRouter;
