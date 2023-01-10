import followersRepositories from "../repositories/followers.repositories.js";

export async function getFollowers(req, res) {
  const { userId } = req.user;

  try {
    const followers = await followersRepositories.getFollowers(userId);

    if (followers.length === 0) {
      return res.status(200).send({
        message: "You don't follow anyone yet. Search for new friends!",
      });
    }

    res.status(200).send(followers);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getFollowersById(req, res) {
  const { userId } = req.user;
  const { id } = res.locals.followerId;
  const followerId = parseInt(id);

  try {
    const followers = await followersRepositories.getFollowersById(
      userId,
      followerId
    );

    let isFollowing;

    if (followers[0].count === "0") {
      isFollowing = false;
    } else {
      isFollowing = true;
    }

    res.status(200).send(isFollowing);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postFollowers(req, res) {
  const { userId } = req.user;
  const { id } = res.locals.followerId;
  const followerId = parseInt(id);

  try {
    await followersRepositories.postFollowers(userId, followerId);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
