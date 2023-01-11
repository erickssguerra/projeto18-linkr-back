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
        COALESCE (ARRAY_AGG( JSON_BUILD_OBJECT (
            'user_name',  users2.name,
            'user_id', users2.id
            )) FILTER (WHERE users2.id IS NOT NULL), ARRAY[]::json[]) 
            AS likes,
        posts.id AS post_id,
        posts.description,
        posts.url,
        users.name AS user,
        users.id AS user_id,
        users.picture_url AS "userImage"
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN likes ON posts.id = likes.post_id
      LEFT JOIN users AS users2 ON users2.id = likes.user_id
      WHERE users.id=$1
      GROUP BY posts.id, users.name, users.picture_url, users.id
      ORDER BY posts.created_at DESC;`,
    [user_id]
  );

  return rows;
}

async function selectUsersByString(string, userId) {
  const { rows } = await connectionDB.query(
    `
    SELECT 
        users.id,
        "name",
        picture_url,
        CASE WHEN EXISTS(SELECT * FROM followers WHERE followers.followed_id = users.id AND followers.user_id = $2) THEN true
        ELSE false
        END AS is_following
      FROM users
      LEFT JOIN followers ON users.id = followers.user_id
      WHERE
        "name"
      ILIKE
        $1
      ORDER BY
        is_following DESC
      LIMIT 10;
    `,
    [`%${string}%`, userId]
  );

  return rows;
}

const usersRepositories = {
  selectUserByEmail,
  signUpUser,
  selectUserById,
  selectUserInfosById,
  getPostsByUserId,
  selectUsersByString,
};

export default usersRepositories;
