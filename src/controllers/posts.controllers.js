import postRepository from "../repositories/posts.repository.js";

export async function getPosts(req, res) {

  try {
    const postsData = await postRepository.getPosts();

    return res.status(200).send(postsData);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  };
};