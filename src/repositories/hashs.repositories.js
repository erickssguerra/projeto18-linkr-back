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
     LEFT JOIN hashs ON posts.id=hashs.post_id
      WHERE
      hashs.name=$1 AND
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
      LEFT JOIN hashs ON posts.id=hashs.post_id
      WHERE hashs.name=$1
      GROUP BY posts.id, users.name, users.picture_url, users.id
    ORDER BY created_at DESC
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
