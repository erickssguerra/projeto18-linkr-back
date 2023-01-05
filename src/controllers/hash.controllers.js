import getMetaData from "metadata-scraper";

import hashsRepositories from "../repositories/hashs.repositories.js";

export async function getPosts(req, res) {
  const hashId  = res.locals.hashId;

  try {
    const postsData = await hashsRepositories.getPostsByHashId(hashId);
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
