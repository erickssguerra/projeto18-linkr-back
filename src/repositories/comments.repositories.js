import connectionDB from "../database/connectionDB.js";

async function postComment(user_id, post_id, comment) {
  await connectionDB.query(
    `
    INSERT INTO
        comments(user_id, post_id, comment)
    VALUES
        ($1, $2, $3);
    `,
    [user_id, post_id, comment]
  );
}

async function getComments(post_id) {
  const {rows} = await connectionDB.query(
    `
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
      c.post_id = $1
    ORDER BY
      c.created_at
    `,
    [post_id]
  );

  return rows;
}

export const commentsRepositories = {
  postComment,
  getComments,
};
