import { Router } from "express";
import {
  deleteFollowers,
  getFollowers,
  getFollowersById,
  postFollowers,
} from "../controllers/followers.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { followValidation } from "../middlewares/followers/followValidation.middleware.js";
import { unfollowValidation } from "../middlewares/followers/unfollowValidation.middleware.js";
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

followersRouter.post(
  "/followers/:id",
  authValidation,
  validateParams(followerIdParamSchema, "followerId"),
  followValidation,
  postFollowers
);

followersRouter.delete(
  "/followers/:id",
  authValidation,
  validateParams(followerIdParamSchema, "followerId"),
  unfollowValidation,
  deleteFollowers
);

export default followersRouter;
