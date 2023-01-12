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
        (
          SELECT
            COALESCE( JSON_AGG(comments_rows), '[]' )
          FROM (
            SELECT
              c.user_id, c.comment,
              u.name, u.picture_url
            FROM
              comments c
            JOIN
              users u
            ON
              c.user_id = u.id
            WHERE
              post_id = posts.id
          ) AS comments_rows
        ) AS comments,
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
    WITH users_table AS 
    (SELECT users.id, 
      EXISTS (SELECT * FROM followers 
        WHERE followers.followed_id = users.id AND followers.user_id = $2) 
      AS is_following FROM users)
    SELECT 
        users.id,
        "name",
        picture_url, 
        users_table.is_following
       FROM
        users
      LEFT JOIN users_table ON users.id = users_table.id
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
