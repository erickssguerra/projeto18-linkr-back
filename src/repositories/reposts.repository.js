import connectionDB from "../database/connectionDB.js";

async function postRepost(post_id, userId) {
  try {
    return await connectionDB.query(
    `
    DO $$
    BEGIN
    IF EXISTS (SELECT * FROM reposts WHERE post_id = ${post_id} AND user_id = ${userId}) THEN
      DELETE FROM reposts WHERE post_id = ${post_id} AND user_id = ${userId};
    ELSE
      INSERT INTO "reposts" ("post_id", "user_id") VALUES (${post_id}, ${userId});
    END IF;
    END
    $$
    `);
  } catch (err) {
    return console.log(err.detail);
  }
}

async function getRepostsByPostId(post_id) {
  try {
    const { rows } = await connectionDB.query(
      `SELECT
        "user_id",
        users.name AS "user_name"
      FROM "reposts"
      LEFT JOIN users ON users.id = reposts.user_id
      WHERE post_id = $1;`,
      [post_id]
    );
    return rows;
  } catch (err) {
    return console.log(err);
  }
}

const repostsRepository = {
  postRepost,
  getRepostsByPostId,
};

export default repostsRepository