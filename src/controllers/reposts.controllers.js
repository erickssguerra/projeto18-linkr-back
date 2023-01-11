import repostsRepository from "../repositories/reposts.repository.js";

export async function postRepost(req, res) {
  const { userId } = req.user;
  const post_id = res.locals.postExists;

  try {
    await repostsRepository.postRepost(post_id, userId);
    const rows = await repostsRepository.getRepostsByPostId(post_id);
    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getRepostsByPostId(req, res) {
  const post_id = res.locals.postExists;
  try {
    const rows = await repostsRepository.getRepostsByPostId(post_id);
    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
