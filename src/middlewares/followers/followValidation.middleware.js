import followersRepositories from "../../repositories/followers.repositories.js";

export async function followValidation(req, res, next) {
  const { userId } = req.user;
  const { id } = res.locals.followerId;
  const followerId = parseInt(id);

  const followers = await followersRepositories.getFollowersById(
    userId,
    followerId
  );

  if (followers[0].count !== "0") {
    return res
      .status(500)
      .send({ message: "You are already following this user!" });
  }

  try {
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  next();
}
