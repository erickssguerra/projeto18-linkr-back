import { Router } from "express";
import { postSignIn, postSignUp } from "../controllers/users.controllers.js";
import { validateBody } from "../middlewares/schema.middleware.js";
import { signInValidation } from "../middlewares/users/userSignInValidation.middleware.js";
import { signUpValidation } from "../middlewares/users/userSignUpValidation.middleware.js";
import { signInSchema } from "../schemas/signIn.schema.js";
import { signUpSchema } from "../schemas/signUp.schema.js";

const usersRouter = Router();

usersRouter.post(
  "/signin",
  validateBody(signInSchema, "signIn"),
  signInValidation,
  postSignIn
);
usersRouter.post(
  "/signup",
  validateBody(signUpSchema, "signUp"),
  signUpValidation,
  postSignUp
);

export default usersRouter;
