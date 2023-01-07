import { Router } from "express";
import { getPosts, postSignIn, postSignUp } from "../controllers/users.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { validateBody, validateParams } from "../middlewares/schema.middleware.js";
import { signInValidation } from "../middlewares/users/userSignInValidation.middleware.js";
import { signUpValidation } from "../middlewares/users/userSignUpValidation.middleware.js";
import { userValidation } from "../middlewares/users/userValidation.middleware.js";
import { signInSchema } from "../schemas/signIn.schema.js";
import { signUpSchema } from "../schemas/signUp.schema.js";
import { userIdParamSchema } from "../schemas/userIdParam.schema.js";

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
usersRouter.get(
  "/user/:id",
  authValidation,
  validateParams(userIdParamSchema, "id"),
  userValidation,
  getPosts
);

export default usersRouter;
