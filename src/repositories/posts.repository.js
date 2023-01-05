import connectionDB from "../database/connectionDB.js";

async function getPosts() {
  const { rows } = await connectionDB.query(
    `SELECT
    posts.description AS description,
    posts.url AS url,
    users.name AS user,
    users.picture_url AS "userImage"
    FROM posts
    INNER JOIN users on posts.user_id=users.id
    ORDER BY posts.created_at DESC
    LIMIT 20`
  );

  return rows;
}

async function publishPost(userId, description, url) {
  const { rows } = await connectionDB.query(
    `
    INSERT INTO
      posts(user_id, description, url)
    VALUES
      ($1, $2, $3)
    RETURNING
      id;
    `,
    [userId, description, url]
  );

  return rows[0].id;
}

async function insertHashtags(hashtagsArray, postId) {
  for (let i = 0; i < hashtagsArray.length; i++) {
    await connectionDB.query(
      `
      INSERT INTO
        hashs(name, post_id)
      VALUES
        ($1, $2);
      `,
      [hashtagsArray[i], postId]
    );
  };
}

const postRepository = {
  getPosts,
  publishPost,
  insertHashtags,
};

export default postRepository;
