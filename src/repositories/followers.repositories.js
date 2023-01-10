import connectionDB from "../database/connectionDB.js";

async function getFollowers(userId) {
  const { rows } = await connectionDB.query(
    `SELECT 
            followed_id
        FROM followers
        WHERE user_id = $1;`,
    [userId]
  );

  return rows;
}

async function getFollowersById(userId, followedId) {
  const { rows } = await connectionDB.query(
    `SELECT 
        COUNT(1)
      FROM followers
      WHERE user_id = $1 AND followed_id = $2;`,
    [userId, followedId]
  );

  return rows;
}

async function postFollowers(userId, followedId) {
  return await connectionDB.query(
    `INSERT INTO
        followers (user_id, followed_id)
      VALUES ($1, $2);`,
    [userId, followedId]
  );
}

async function deleteFollowers(userId, followedId) {
  return await connectionDB.query(
    `DELETE 
        FROM followers 
      WHERE user_id = $1 AND followed_id = $2;`,
    [userId, followedId]
  );
}

const followersRepositories = {
  getFollowers,
  getFollowersById,
  postFollowers,
  deleteFollowers,
};

export default followersRepositories;
