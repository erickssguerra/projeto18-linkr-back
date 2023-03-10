import getMetaData from "metadata-scraper";

import postRepository from "../repositories/posts.repository.js";

export async function getPosts(req, res) {
  const { userId } = req.user;

  try {
    const postsData = await postRepository.getPosts(userId);
    const formattedData = await Promise.all(
      postsData.map(async (post) => {
        const metadata = await getMetaData(post.url);

        return {
          ...post,
          metadata: {
            icon: metadata.icon,
            title: metadata.title,
            description: metadata.description,
          },
        };
      })
    );

    return res.status(200).send(formattedData);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function publishPost(req, res) {
  const { userId } = req.user;
  const { url, description, hashtagsArray } = req.body;

  try {
    const postId = await postRepository.publishPost(userId, description, url);

    if (hashtagsArray.length > 0)
      await postRepository.insertHashtags(hashtagsArray, postId);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function deletePost(req, res) {
  const { post_id } = res.locals.post_id;

  try {
    await postRepository.deletePost(post_id);

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function updatePost(req, res) {
  const { description, removedHashtags, newHashtags, post_id } = req.body;

  try {
    await postRepository.deleteHashtags(removedHashtags, post_id);
    await postRepository.insertHashtags(newHashtags, post_id);
    await postRepository.updatePost(description, post_id);

    return res.sendStatus(200);
  } catch (e) {
    return res.status(500).send(e);
  }
}
