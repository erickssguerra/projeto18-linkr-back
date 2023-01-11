import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { postIdValidation } from "../middlewares/posts/postIdValidation.middleware.js";
import { postRepost, getRepostsByPostId } from "../controllers/reposts.controllers.js";

const repostsRouter = Router ()

repostsRouter.post("/repost/:post_id", authValidation, postIdValidation, postRepost)

repostsRouter.get("/repost/:post_id", authValidation, postIdValidation, getRepostsByPostId)

export default repostsRouter;