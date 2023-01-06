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
    posts.description AS description,
    posts.url AS url,
    users.name AS user,
    users.picture_url AS "userImage"
    FROM posts
    INNER JOIN users ON posts.user_id=users.id
    INNER JOIN hashs ON posts.id=hashs.post_id
    WHERE hashs.name=$1
    ORDER BY posts.created_at DESC
   ;`,
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
