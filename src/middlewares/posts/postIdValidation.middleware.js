import postRepository from "../../repositories/posts.repository.js";

export async function postIdValidation(req, res, next) {
  const { post_id } = req.params;

  if (!Number(post_id)) {
    return res.status(400).send({ message: "post_id must be a number." });
  }
  try {
    const postExists = await postRepository.checkPost(post_id);
    if (!postExists) {
      return res
        .status(400)
        .send({ message: `There's no post_id: ${post_id}` });
    } else {
      res.locals.postExists = post_id;
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  next();
}
