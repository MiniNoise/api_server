import { booster } from '@booster-ts/core';
import inject from '../../injector';
import Database from '../../Modules/Database/Database';
import { validateToken, createToken } from './Query';
import { createError } from '../../Models/IError';
import Utils from '../../Modules/Utils/Utils';

/**
 * Session
 * @description Handls User sessions
 * @author ImOverlord
 */
@booster()
export default class Session {

    constructor(
        private database: Database,
        private utils: Utils
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

    /**
     * newSession
     * @description Created a new session
     * @param idUser of the user
     */
    public newSession(idUser: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const token = this.utils.createToken();
            this.database.query(createToken, [idUser, token])
            .then(() => {
                resolve(token);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}

inject.register("Session", Session);
