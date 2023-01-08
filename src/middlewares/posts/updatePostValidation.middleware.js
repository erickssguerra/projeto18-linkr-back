import postRepository from "../../repositories/posts.repository.js";

export async function updatePostValidation(req, res, next) {
  const { post_id } = res.locals.post_id;
  const { userId } = req.user;

  try {
    const post = await postRepository.getPostByIdAndUserId(post_id, userId);

    if (post.length === 0) {
      return res.status(401).send('e');
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  next();
};