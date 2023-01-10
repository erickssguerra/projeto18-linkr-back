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
import { followedIdParamSchema } from "../schemas/followedIdParam.schema.js";

const followersRouter = Router();

followersRouter.get("/followers", authValidation, getFollowers);

followersRouter.get(
  "/followers/:id",
  authValidation,
  validateParams(followedIdParamSchema, "followedId"),
  getFollowersById
);

followersRouter.post(
  "/followers/:id",
  authValidation,
  validateParams(followedIdParamSchema, "followedId"),
  followValidation,
  postFollowers
);

followersRouter.delete(
  "/followers/:id",
  authValidation,
  validateParams(followedIdParamSchema, "followedId"),
  unfollowValidation,
  deleteFollowers
);

export default followersRouter;
