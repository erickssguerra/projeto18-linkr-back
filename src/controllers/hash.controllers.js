import getMetaData from "metadata-scraper";

import hashsRepositories from "../repositories/hashs.repositories.js";

export async function getPosts(req, res) {
  const hash_name = res.locals.hashName;

  try {
    const postsData = await hashsRepositories.getPostsByHashName(hash_name);
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
    return res.sendStatus(500);
  }
}

export async function getHashtags(req, res) {
  try {
    const hashtagsArray = await hashsRepositories.getHashtags();

    hashtagsArray.forEach((hashtagInfo) => {
      const hashtagName = hashtagInfo.name.split("#");
      hashtagInfo.name = hashtagName[1];
    });

    return res.send(hashtagsArray);
  } catch (err) {
    return res.status(500).send(err);
  }
}
