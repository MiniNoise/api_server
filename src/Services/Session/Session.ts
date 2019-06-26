import { booster } from '@booster-ts/core';
import inject from '../../injector';
import Database from '../../Modules/Database/Database';
import { validateToken } from './Query';
import { createError } from '../../Models/IError';

/**
 * Session
 * @description Handls User sessions
 * @author ImOverlord
 */
@booster()
export default class Session {

    constructor(
        private database: Database
    ) { }

    /**
     * validateUser
     * @description Checks if user has valid session token
     * @param email of user
     * @param token of user
     */
    public validateUser(email: string, token: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.database.query(validateToken, [email, token])
            .then((result) => {
                if (result.rowCount === 1)
                    resolve(result.rows[0].idUser);
                reject(createError('Session', "Failed to validate User"));
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}

inject.register("Session", Session);
