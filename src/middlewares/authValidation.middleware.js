import jwt from "jsonwebtoken";
import usersRepositories from "../repositories/users.repositories.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const secretkey = process.env.JWT_SECRET;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    jwt.verify(token, secretkey, async (error, decoded) => {
      if (error) {
        return res.sendStatus(401);
      }
      const { userId } = decoded;

      const userExists = await usersRepositories.selectUserById(userId);

      if (userExists.length === 0) {
        return res.sendStatus(401);
      }

      req.user = { userId };

      return next();
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
