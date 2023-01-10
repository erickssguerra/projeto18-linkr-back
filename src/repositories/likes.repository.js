import connectionDB from "../database/connectionDB.js";

async function upsertLike(post_id, userId) {
  try {
    return await connectionDB.query(
      `
      DO $$
      BEGIN
      IF EXISTS (SELECT * FROM likes WHERE post_id = ${post_id} AND user_id = ${userId}) THEN
          DELETE FROM likes WHERE post_id = ${post_id} AND user_id = ${userId};
      ELSE
          INSERT INTO likes (post_id, user_id) VALUES (${post_id},${userId});
      END IF;
      END
      $$
      `
    );
  } catch (err) {
    return console.log(err);
  }
}

async function getLikesByPostId(post_id, userId) {
  try {
    const { rows } = await connectionDB.query(
      `
      SELECT 
        users.name AS user_name,
        likes.user_id
      FROM likes
      LEFT JOIN users ON users.id = likes.user_id
      WHERE likes.post_id = $1;
      ;`,
      [post_id]
    );

    return rows;
  } catch (err) {
    return err.data;
  }
}

const likesRepository = {
  upsertLike,
  getLikesByPostId,
};

export default likesRepository;
