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

const followersRepositories = {
  getFollowers,
};

export default followersRepositories;
