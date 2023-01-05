import connectionDB from "../database/connectionDB.js";

async function getHashByName(hashName) {
  const { rows } = await connectionDB.query(
    `SELECT * FROM hashs WHERE name = $1;`,
    [hashName]
  );

  return rows;
}

async function getPostsByHashId(hashId) {
  const { rows } = await connectionDB.query(
    `SELECT
    posts.description AS description,
    posts.url AS url,
    users.name AS user,
    users.picture_url AS "userImage"
    FROM posts
    INNER JOIN users ON posts.user_id=users.id
    INNER JOIN hashs ON posts.id=hashs.post_id
    WHERE hashs.id=$1
    ORDER BY posts.created_at DESC
   ;`,
    [hashId]
  );

  return rows;
}

const hashsRepositories = {
  getHashByName,
  getPostsByHashId,
};

export default hashsRepositories;
