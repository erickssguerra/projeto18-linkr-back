import { Router } from "express";
import { postComment } from "../controllers/comments.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { postIdValidation } from "../middlewares/posts/postIdValidation.middleware.js";
import { validateBody } from "../middlewares/schema.middleware.js";
import { commentSchema } from "../schemas/comments.schema.js";

const commentsRouter = Router();

commentsRouter.post("/comments/:post_id", authValidation, validateBody(commentSchema, "comment"), postIdValidation, postComment);

export default commentsRouter;
