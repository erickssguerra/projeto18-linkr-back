import connectionDB from "../database/connectionDB.js";

async function getPosts(userId) {
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
  (users_table.is_following = true OR  reposts.user_id = $1) AND
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
      WHERE followers.followed_id = users.id AND followers.user_id = $1 OR posts.user_id = $1
      GROUP BY posts.id, users.name, users.picture_url, users.id
    ORDER BY created_at DESC
      LIMIT 20;
    `,
    [userId]
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
    if (hashtagsArray[i] === "#") return;

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

async function deleteHashtags(hashtagsArray, postId) {
  hashtagsArray.forEach(async (hashtag) => {
    await connectionDB.query(
      `
      DELETE FROM
        hashs
      WHERE
        "name"=$1
      AND
        "post_id"=$2
      `,
      [hashtag, postId]
    );
  });
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

async function updatePost(description, post_id) {
  await connectionDB.query(
    `
    UPDATE
      posts
    SET 
      description=$1
    WHERE
      "id"=$2
    `,
    [description, post_id]
  );
}

async function checkPost(post_id) {
  const { rows } = await connectionDB.query(
    `SELECT CASE WHEN EXISTS (
      SELECT *
      FROM posts
      WHERE posts.id = $1
    )
    THEN CAST(1 AS BIT)
    ELSE CAST(0 AS BIT) END;`,
    [post_id]
  );
  const answer = Boolean(Number(rows[0].case));
  return answer;
}

const postRepository = {
  getPosts,
  publishPost,
  insertHashtags,
  getPostByIdAndUserId,
  deletePost,
  checkPost,
  deleteHashtags,
  updatePost,
};

export default postRepository;
