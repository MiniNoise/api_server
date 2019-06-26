/**
 * User Query
 * @description File with all User related pgSql queries
 * @author ImOverlord
 */

/**
 * userRegister
 * @description Register SQL Command
 * @param $1 email
 * @param $2 password
 */
export const userRegister = `INSERT INTO noise.users(email, password) VALUES($1, $2)`;

/**
 * userLogin
 * @description Login SQL Command
 * @param $1 email
 * @param $2 password
 */
export const userLogin = `SELECT "idUser" from noise.users WHERE email=$1 AND password=$2`;

/**
 * createToken
 * @description Session Create SQL Command
 * @param $1 idUser
 * @param $2 token
 */
export const createToken = `INSERT INTO noise.sessions("idUser", token) VALUES ($1, $2)`;


/**
 * removeUser
 * @description Removes user
 * @param $1 users email
 */
export const removeUser = `DELETE FROM noise.users WHERE "email"=$1`;
