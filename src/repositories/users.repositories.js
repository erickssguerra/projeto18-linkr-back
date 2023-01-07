import connectionDB from "../database/connectionDB.js";

async function selectUserByEmail(email) {
  return await connectionDB.query(`SELECT * FROM users WHERE email=$1;`, [
    email,
  ]);
}

async function signUpUser(name, email, password, picture_url) {
  return await connectionDB.query(
    `
    INSERT INTO "users" (name, email, password, picture_url)
    VALUES ($1, $2, $3, $4);`,
    [name, email, password, picture_url]
  );
}

async function selectUserById(userId) {
  const { rows } = await connectionDB.query(
    `SELECT id FROM users WHERE id=$1;`,
    [userId]
  );

  return rows;
}

async function selectUserInfosById(userId) {
  const { rows } = await connectionDB.query(
    `SELECT name, picture_url FROM users WHERE id=$1;`,
    [userId]
  );

  return rows;
}

async function getPostsByUserId(user_id) {
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
    LEFT JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON posts.id = likes.post_id
    WHERE users.id=$1
    GROUP BY likes.post_id, posts.id, users.name, users.picture_url, users.id
    ORDER BY posts.created_at DESC;`,
    [user_id]
  );

  return rows;
}

const usersRepositories = {
  selectUserByEmail,
  signUpUser,
  selectUserById,
  selectUserInfosById,
  getPostsByUserId,
};

export default usersRepositories;
