import followersRepositories from "../repositories/followers.repositories.js";

export async function getFollowers(req, res) {
  const { userId } = req.user;

  try {
    const followers = await followersRepositories.getFollowers(userId);

    res.status(200).send(followers);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getFollowersById(req, res) {
  const { userId } = req.user;
  const { id } = res.locals.followedId;
  const followedId = parseInt(id);

  try {
    const followers = await followersRepositories.getFollowersById(
      userId,
      followedId
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
  const { id } = res.locals.followedId;
  const followedId = parseInt(id);

  try {
    await followersRepositories.postFollowers(userId, followedId);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteFollowers(req, res) {
  const { userId } = req.user;
  const { id } = res.locals.followedId;
  const followedId = parseInt(id);

  try {
    await followersRepositories.deleteFollowers(userId, followedId);

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
