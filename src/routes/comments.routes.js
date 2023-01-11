import { Router } from "express";
import { postComment } from "../controllers/comments.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { validateBody } from "../middlewares/schema.middleware.js";
import { commentSchema } from "../schemas/comments.schema.js";

const commentsRouter = Router();

commentsRouter.post("/comments", authValidation, validateBody(commentSchema, "comment"), postComment);

export default commentsRouter;
