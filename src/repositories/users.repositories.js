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
    `
    WITH reposts_table AS (SELECT posts.id, EXISTS (SELECT * FROM reposts WHERE reposts.post_id = posts.id) AS repost FROM posts),
    name_reposted AS (SELECT users.name, users.id FROM reposts LEFT JOIN users ON reposts.user_id = users.id ) ,
    users_table AS (SELECT users.id, EXISTS (SELECT * FROM followers WHERE followers.followed_id = users.id AND followers.user_id = 1) AS is_following FROM users)
    SELECT
       (
          SELECT
            COALESCE( JSONB_AGG(comments_rows), '[]' )
          FROM (
            SELECT
              c.user_id AS comment_author_id, c.comment,
              u.name, u.picture_url,
              ARRAY(
                SELECT
                  f.user_id
                FROM
                  followers f
                WHERE
                  f.followed_id = c.user_id
              ) AS followers
            FROM
              comments c
            JOIN
              users u
            ON
              c.user_id = u.id
            WHERE
              post_id = posts.id
            ORDER BY
              c.created_at
          ) AS comments_rows
        ) AS comments,
      posts.id AS post_id,
        posts.description,
        posts.url,
        users.name AS user,
        users.id AS user_id,
        users.picture_url AS "userImage",
      reposts_table.repost,
      name_reposted.name AS repost_user_name,
      name_reposted.id AS repost_user_id,
      reposts.created_at
      FROM posts
      LEFT JOIN users ON posts.user_id = users.id
      LEFT JOIN followers ON posts.user_id = followers.followed_id
      LEFT JOIN followers AS followers2 ON users.id = followers2.user_id
      LEFT JOIN reposts_table ON reposts_table.id = posts.id
      LEFT JOIN reposts ON reposts.post_id = posts.id
      LEFT JOIN users AS users2 ON users2.id = reposts.user_id
      LEFT JOIN name_reposted ON name_reposted.id = users2.id
    LEFT JOIN name_reposted AS reposts2 on reposts2.id = followers.user_id
     LEFT JOIN users_table ON users2.id = users_table.id
      WHERE
      name_reposted.id=$1 AND
         repost = true
      GROUP BY posts.id, users.name, users.picture_url, users.id,   reposts_table.repost,  reposts.user_id, name_reposted.name, name_reposted.id, reposts.created_at
    
    UNION
    
    SELECT
          (
          SELECT
            COALESCE( JSONB_AGG(comments_rows), '[]' )
          FROM (
            SELECT
              c.user_id AS comment_author_id, c.comment,
              u.name, u.picture_url,
              ARRAY(
                SELECT
                  f.user_id
                FROM
                  followers f
                WHERE
                  f.followed_id = c.user_id
              ) AS followers
            FROM
              comments c
            JOIN
              users u
            ON
              c.user_id = u.id
            WHERE
              post_id = posts.id
            ORDER BY
              c.created_at
          ) AS comments_rows
        ) AS comments,
        posts.id AS post_id,
        posts.description,
        posts.url,
        users.name AS user,
        users.id AS user_id,
        users.picture_url AS "userImage",
      false as repost,
      NULL as repost_user_name,
      NULL AS repost_user_id,
      posts.created_at
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN likes ON posts.id = likes.post_id
      LEFT JOIN users AS users2 ON users2.id = likes.user_id 
      LEFT JOIN followers ON posts.user_id = followers.followed_id
      WHERE users.id=$1
      GROUP BY posts.id, users.name, users.picture_url, users.id
    ORDER BY created_at DESC
      ;
   `,
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
