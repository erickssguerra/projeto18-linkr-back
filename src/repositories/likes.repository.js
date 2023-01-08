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
      $$`
    );
  } catch (err) {
    return console.log(err);
  }
}

const likesRepository = {
  upsertLike,
};

export default likesRepository;
