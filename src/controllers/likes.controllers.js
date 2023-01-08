import likesRepository from "../repositories/likes.repository.js";

export async function postLike(req, res, next) {
  const { userId } = req.user;
  const post_id = res.locals.postExists;
  await likesRepository.upsertLike(post_id, userId);
  next();
}
