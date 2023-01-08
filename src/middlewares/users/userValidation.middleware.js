import usersRepositories from "../../repositories/users.repositories.js";

export async function userValidation(req, res, next) {
  const { id } = res.locals.id;

  const user = await usersRepositories.selectUserById(id);

  if (user.length === 0) {
    return res.sendStatus(404);
  }

  const user_id = user[0].id;

  res.locals.userId = user_id ;
  try {
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  next();
}