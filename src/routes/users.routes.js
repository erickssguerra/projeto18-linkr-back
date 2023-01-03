import { Router } from "express";
import { postSignIn } from "../controllers/users.controllers.js";
import { validateBody } from "../middlewares/schema.middleware.js";
import { signInValidation } from "../middlewares/users/userSignInValidation.middleware.js";
import { signInSchema } from "../schemas/signIn.schema.js";

const usersRouter = Router();

usersRouter.post("/signin", validateBody(signInSchema, "signIn"), signInValidation, postSignIn);

export default usersRouter;
