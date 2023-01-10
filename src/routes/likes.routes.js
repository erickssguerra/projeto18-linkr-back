import { Router } from "express";
import { postLike, getLikesByPostId } from "../controllers/likes.controllers.js";
// import { getPosts } from "../controllers/posts.controllers.js";

import { authValidation } from "../middlewares/authValidation.middleware.js";
import { postIdValidation } from "../middlewares/posts/postIdValidation.middleware.js";

const likesRouter = Router()

likesRouter.post("/like/:post_id", authValidation, postIdValidation, postLike)

likesRouter.get("/like/:post_id", authValidation, postIdValidation, getLikesByPostId)

export default likesRouter;