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
