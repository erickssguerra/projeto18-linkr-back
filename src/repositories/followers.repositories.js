import connectionDB from "../database/connectionDB.js";

async function getFollowers(userId) {
  const { rows } = await connectionDB.query(
    `SELECT 
            follower_id
        FROM followers
        WHERE user_id = $1;`,
    [userId]
  );

  return rows;
}

async function getFollowersById(userId, followerId) {
  const { rows } = await connectionDB.query(
    `SELECT 
        COUNT(1)
      FROM followers
      WHERE user_id = $1 AND follower_id = $2;`,
    [userId, followerId]
  );

  return rows;
}

async function postFollowers(userId, followerId) {
  return await connectionDB.query(
    `INSERT INTO
        followers (user_id, follower_id)
      VALUES ($1, $2);`,
    [userId, followerId]
  );
}

async function deleteFollowers(userId, followerId) {
  return await connectionDB.query(
    `DELETE 
        FROM followers 
      WHERE user_id = $1 AND follower_id = $2;`,
    [userId, followerId]
  );
}

const followersRepositories = {
  getFollowers,
  getFollowersById,
  postFollowers,
  deleteFollowers,
};

export default followersRepositories;
