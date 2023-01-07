import bcrypt from "bcrypt";
import usersRepositories from "../../repositories/users.repositories.js";

export async function signInValidation(req, res, next) {
  const { email, password } = res.locals.signIn;

  try {
    const user = await usersRepositories.selectUserByEmail(email);

    if (user.rows.length === 0) {
      return res
        .status(401)
        .send({ message: "Invalid email or password, please try again." });
    }

    const passwordCheck = bcrypt.compareSync(password, user.rows[0].password);

    if (!passwordCheck) {
      return res
        .status(401)
        .send({ message: "Invalid email or password, please try again." });
    }

    const id = user.rows[0].id;
    const picture_url = user.rows[0].picture_url;

    res.locals.user = { id, picture_url };
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
