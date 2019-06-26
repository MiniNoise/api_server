/**
 * createMinitel
 * @description SQL Command to create new minitel
 * @param $1 Minitel's name
 * @param $2 Minitel's Identifier
 */
export const createMinitel = `INSERT INTO noise.minitel (name, uid) VALUES ($1, $2)`;

/**
 * addOwner
 * @description Adds a new owner to the minitel
 * @param $1 ID of the minitel Machine
 * @param $2 ID of the user
 */
export const addOwner = `INSERT INTO noise.owners ("idMachine", "idUser") VALUES ($1, $2)`;

/**
 * getMachine
 * @description Gets Minitel Machine from UID
 * @param $1 Mintel's UID
 */
export const getMachine = `SELECT * FROM noise.minitel WHERE uid=$1`;

/**
 * getMachines
 * @description Gets machines from Owner
 * @param $1 idUser of the owner
 */
export const getMachines = `SELECT noise.minitel.uid, noise.minitel.name FROM noise.minitel INNER JOIN noise.owners ON noise.minitel."idMachine"=noise.owners."idMachine" AND noise.owners."idUser"=$1`;

/**
 * checkOwnership
 * @description Checks if user owns minitels
 * @param $1 idMachine
 * @param $2 idUser
 */
export const checkOwnership = `SELECT * FROM noise.owners WHERE "idMachine"=$1 AND "idUser"=$2`;

/**
 * deleteMachine
 * @description Remvoes minitel
 * @param $1 Identifier of the minitel
 */
export const deleteMachine = `DELETE FROM noise.minitel WHERe "idMachine"=$1`;
