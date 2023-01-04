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
};

const postRepository = {
  getPosts
};

export default postRepository;