import jwt from "jsonwebtoken";
import { selectUserById } from "../repositories/users.repositories.js";

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

      const userExists = await selectUserById(userId);

      if (userExists.rows.length === 0) {
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
