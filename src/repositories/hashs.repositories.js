import connectionDB from "../database/connectionDB.js";

async function getHashByName(hashName) {
  const { rows } = await connectionDB.query(
    `SELECT * FROM hashs WHERE name = $1;`,
    [hashName]
  );

  return rows;
}

async function getPostsByHashName(hash_name) {
  const { rows } = await connectionDB.query(
    `SELECT
      COALESCE(COUNT(likes.post_id),0) AS likes,
      posts.id AS post_id,
      posts.description,
      posts.url,
      users.name AS user,
      users.id AS user_id,
      users.picture_url AS "userImage"
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON posts.id = likes.post_id
    LEFT JOIN hashs ON posts.id=hashs.post_id
    WHERE hashs.name=$1
    GROUP BY likes.post_id, posts.id, users.name, users.picture_url, users.id
    ORDER BY posts.created_at DESC;`,
    [hash_name]
  );

  return rows;
}

async function getHashtags() {
  const hashtags = await connectionDB.query(
    `
    SELECT
        h.name AS hashtag, h.name, COUNT(h.name) AS count
    FROM
        hashs h
    GROUP BY
        h.name
    ORDER BY
        count DESC
    LIMIT
        10;
    `
  );

  return hashtags.rows;
}

const hashsRepositories = {
  getHashByName,
  getPostsByHashName,
  getHashtags,
};

export default hashsRepositories;
