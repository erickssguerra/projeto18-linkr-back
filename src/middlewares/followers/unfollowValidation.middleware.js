import followersRepositories from "../../repositories/followers.repositories.js";
import usersRepositories from "../../repositories/users.repositories.js";

export async function unfollowValidation(req, res, next) {
  const { userId } = req.user;
  const { id } = res.locals.followerId;
  const followerId = parseInt(id);

  try {
    if (userId === followerId) {
      return res.status(500).send({ message: "You can't unfollow yourself" });
    }

    const followerExists = await usersRepositories.selectUserById(followerId);

    if (followerExists.length === 0) {
      return res.status(404).send({ message: "User not found!" });
    }

    const followers = await followersRepositories.getFollowersById(
      userId,
      followerId
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
