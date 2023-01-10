import likesRepository from "../repositories/likes.repository.js";

export async function postLike(req, res) {
  const { userId } = req.user;
  const post_id = res.locals.postExists;
  try {
    await likesRepository.upsertLike(post_id, userId);
    const rows = await likesRepository.getLikesByPostId(post_id);
    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getLikesByPostId(req, res) {
  const post_id = res.locals.postExists;
  try {
    const rows = await likesRepository.getLikesByPostId(post_id);
    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
