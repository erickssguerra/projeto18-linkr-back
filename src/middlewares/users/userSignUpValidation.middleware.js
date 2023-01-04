import bcrypt from "bcrypt";
import { selectUserByEmail } from "../../repositories/users.repositories.js";

export async function signUpValidation(req, res, next) {
  const { email, password, name, picture_url } = res.locals.signUp;

  try {
    const user = await selectUserByEmail(email);

    if (user.rowCount) {
      return res.status(401).send({ message: "Email already registered!" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);
    res.locals.signUpValidated = {
      email,
      password: encryptedPassword,
      name,
      picture_url,
    };
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
