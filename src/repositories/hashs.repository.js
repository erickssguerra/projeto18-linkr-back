import connectionDB from "../database/connectionDB.js";

async function getHashtags() {
  const hashtags = await connectionDB.query(
    `
    SELECT
        h.name AS hashtag, h.name, COUNT(h.name) AS count
    FROM
        hashs h
    GROUP BY
        h.name
    ORDER BY
        count DESC;
    `
  );

  return hashtags.rows;
}

export const hashsRepository = {
  getHashtags,
};
