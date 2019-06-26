/**
 * validateToken
 * @description Checks if token is valide
 * @param $1 email
 * @param $2 token
 */
export const validateToken = `SELECT * from noise.sessions WHERE "idUser"=(SELECT "idUser" FROM noise.users WHERE email=$1) AND token=$2`;
