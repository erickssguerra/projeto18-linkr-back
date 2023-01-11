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

export const commentsRepositories = {
  postComment,
};
