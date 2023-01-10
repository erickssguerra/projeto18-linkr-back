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

const followersRepositories = {
  getFollowers,
  getFollowersById,
};

export default followersRepositories;
