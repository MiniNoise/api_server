/**
 * validateToken
 * @description Checks if token is valide
 * @param $1 email
 * @param $2 token
 */
export const validateToken = `SELECT * from noise.sessions WHERE "idUser"=(SELECT "idUser" FROM noise.users WHERE email=$1) AND token=$2`;

/**
 * createToken
 * @description Session Create SQL Command
 * @param $1 idUser
 * @param $2 token
 */
export const createToken = `INSERT INTO noise.sessions("idUser", token) VALUES ($1, $2)`;
