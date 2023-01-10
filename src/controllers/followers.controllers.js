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
