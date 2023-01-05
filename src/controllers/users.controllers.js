import jwt from "jsonwebtoken";
import { signUpUser } from "../repositories/users.repositories.js";

export async function postSignIn(req, res) {
  const {id, picture_url, name} = res.locals.user;

  try {
    const userData = { userId: id };
    const secretkey = process.env.JWT_SECRET;
    const settings = { expiresIn: 60 * 60 * 24 * 30 };

    const token = jwt.sign(userData, secretkey, settings);

    const user = {
      token,
      picture_url,
      name
    }

    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postSignUp(req, res) {
  const { name, picture_url, email, password } = res.locals.signUpValidated;
  signUpUser(name, email, password, picture_url);
  res.sendStatus(201);
}
