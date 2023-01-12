import { commentsRepositories } from "../repositories/comments.repositories.js";

export async function postComment(req, res) {
  const { user_id, post_id, comment } = req.body;

  try {
    await commentsRepositories.postComment(user_id, post_id, comment);
    const rows = await commentsRepositories.getComments(post_id);
    return res.status(201).send(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

export async function getComments(req, res) {
  const {post_id} = req.body;

  try{
    const rows = await commentsRepositories.getComments(post_id);
    return res.send(rows);
  } catch(err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
