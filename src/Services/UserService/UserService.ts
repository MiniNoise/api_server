import { booster } from '@booster-ts/core';
import inject from '../../injector';
import Database from '../../Modules/Database/Database';
import Utils from '../../Modules/Utils/Utils';
import { userRegister, userLogin, removeUser } from './Query';
import { QueryResult } from 'pg';
import Session from '../Session/Session';

/**
 * UserService
 * @description User Service
 * @author ImOverlord
 */
@booster()
export default class UserService {

    constructor(
        private db: Database,
        private session: Session
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
            return this.session.newSession(id);
        });
    }

    /**
     * login
     * @description Login
     * @param email User Email
     * @param password User Password
     */
    public login(email: string, password: string): Promise<string> {
        return this.db.query(userLogin, [email, password])
        .then((result: QueryResult) => {
            return this.session.newSession(result.rows[0].idUser);
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

}

inject.register("UserService", UserService);
