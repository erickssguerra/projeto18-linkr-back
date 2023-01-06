import connectionDB from "../database/connectionDB.js";

async function getPosts() {
  const { rows } = await connectionDB.query(
    `SELECT
      COALESCE(COUNT(likes.post_id),0) AS likes,
      posts.id AS post_id,
      posts.description,
      posts.url,
      users.name AS user,
      users.picture_url AS "userImage"
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON posts.id = likes.post_id
    GROUP BY likes.post_id, posts.id, users.name, users.picture_url
    ORDER BY posts.created_at DESC
    LIMIT 20;`
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
  }
}

async function getPostByIdAndUserId(post_id, userId) {
  const { rows } = await connectionDB.query(
    `SELECT * FROM posts WHERE id = $1 AND user_id = $2;
      `,
    [post_id, userId]
  );

  return rows;
}

async function deletePost(post_id) {
  await connectionDB.query(
    `
    DELETE FROM posts WHERE id = $1;
    `,
    [post_id]
  );
}

const postRepository = {
  getPosts,
  publishPost,
  insertHashtags,
  getPostByIdAndUserId,
  deletePost,
};

export default postRepository;
