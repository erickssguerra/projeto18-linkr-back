import connectionDB from "../database/connectionDB.js";

export function selectUserByEmail(email) {
  return connectionDB.query(`SELECT * FROM users WHERE email=$1;`, [email]);
}

export function signUpUser(name, email, password, picture_url) {
  return connectionDB.query(
    `
    INSERT INTO "users" (name, email, password, picture_url)
    VALUES ($1, $2, $3, $4);`,
    [name, email, password, picture_url]
  );
}

export function selectUserById(userId) {
  return connectionDB.query(`SELECT id FROM users WHERE id=$1;`, [userId]);
}

export async function selectUsersByString(string) {
  const { rows } = await connectionDB.query(
    `
    SELECT 
      id,
      "name",
      picture_url
    FROM
      users
    WHERE
      "name"
    LIKE
      $1
    ORDER BY
      "name"
    LIMIT 10
    `, [`%${string}%`]
  );

  return rows;
};