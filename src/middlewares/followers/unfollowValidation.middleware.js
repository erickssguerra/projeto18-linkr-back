import followersRepositories from "../../repositories/followers.repositories.js";
import usersRepositories from "../../repositories/users.repositories.js";

export async function unfollowValidation(req, res, next) {
  const { userId } = req.user;
  const { id } = res.locals.followedId;
  const followedId = parseInt(id);

  try {
    if (userId === followedId) {
      return res.status(500).send({ message: "You can't unfollow yourself" });
    }

    const followedExists = await usersRepositories.selectUserById(followedId);

    if (followedExists.length === 0) {
      return res.status(404).send({ message: "User not found!" });
    }

    const followers = await followersRepositories.getFollowersById(
      userId,
      followedId
    );
  
    if (followers[0].count === "0") {
      return res
        .status(500)
        .send({ message: "You don't follow this user!" });
    }


  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  next();
}
