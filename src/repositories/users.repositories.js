import connectionDB from "../database/connectionDB.js";

export function selectUserByEmail(email) {
    return connectionDB.query(`SELECT * FROM users WHERE email=$1;`, [email]);
  }