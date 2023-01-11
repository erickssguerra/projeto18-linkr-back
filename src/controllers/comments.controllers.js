import { commentsRepositories } from "../repositories/comments.repositories.js";

export async function postComment(req, res) {
  const { user_id, post_id, comment } = req.body;

  try {
    await commentsRepositories.postComment(user_id, post_id, comment);
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}
