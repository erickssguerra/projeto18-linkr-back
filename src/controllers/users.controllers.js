import jwt from "jsonwebtoken";

export async function postSignIn(req, res) {
  const id = res.locals.userId;

  try {
    const userData = { userId: id };
    const secretkey = process.env.JWT_SECRET;
    const settings = { expiresIn: 60 * 60 * 24 * 30 };

    const token = jwt.sign(userData, secretkey, settings);

    res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
