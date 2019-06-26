import { booster } from '@booster-ts/core';
import inject from '../../injector';
import Database from '../../Modules/Database/Database';
import Utils from '../../Modules/Utils/Utils';
import { userRegister, createToken, userLogin, removeUser } from './Query';
import { QueryResult } from 'pg';

/**
 * UserService
 * @description User Service
 * @author ImOverlord
 */
@booster()
export default class UserService {

    constructor(
        private db: Database,
        private utils: Utils
    ) { }

    /**
     * regiser
     * @description Create New Account
     * @param email User Email
     * @param password User Password
     * @todo Add Hash System
     */
    public register(email: string, password: string): Promise<string> {
        return this.db.query(userRegister, [email, password])
        .then(() => {
            return this.db.getSerial("noise.users", "idUser");
        })
        .then((id: number) => {
            return this.newToken(id);
        });
    }

    /**
     * login
     * @description Login
     * @param email User Email
     * @param password User Password
     */
    public login(email: string, password: string): Promise<string> {
        console.log(email, password);
        return this.db.query(userLogin, [email, password])
        .then((result: QueryResult) => {
            console.log(result);
            return this.newToken(result.rows[0].idUser);
        });
    }

    /**
     * removeAccount
     * @description Removes user account
     * @param email of the user
     */
    public removeAccount(email: string): Promise<any> {
        return this.db.query(removeUser, [email]);
    }

    /**
     * newToken
     * @description Add session token to user
     * @param idUser User identifier
     */
    private newToken(idUser: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const token = this.utils.createToken();
            console.log(`Creating token for ${idUser}`);
            this.db.query(createToken, [idUser, token])
            .then(() => {
                resolve(token);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

}

inject.register("UserService", UserService);
