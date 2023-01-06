import postRepository from "../../repositories/posts.repository.js";

export async function deletePostValidation(req, res, next) {
  const { post_id } = res.locals.post_id;
  const { userId } = req.user;

  try {
    const post = await postRepository.getPostByIdAndUserId(post_id, userId);

    if (post.length === 0) {
      return res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  next();
}
