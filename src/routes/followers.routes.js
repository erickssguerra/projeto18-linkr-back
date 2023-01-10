import { Router } from "express";
import { getFollowers } from "../controllers/followers.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const followersRouter = Router();

followersRouter.get("/followers", authValidation, getFollowers);

export default followersRouter;
