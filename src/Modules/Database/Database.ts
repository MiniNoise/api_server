import { booster } from '@booster-ts/core';
import inject from '../../injector';
import { Client, QueryResult, Query } from 'pg';
import { createError } from '../../Models/IError';

/**
 * Database
 * @description Modules for interacting with postgress database
 * @author ImOverlord
 */
@booster()
export default class Database {

    /** pg Client */
    private client: Client;

    constructor() {
        this.client = new Client({
            connectionString: process.env.DATABASE_URL
        });
    }

    /**
     * init
     * @description Init Database
     */
    public init(): Promise<void> {
        return this.client.connect();
    }

    /**
     * query
     * @description Query Database
     * @param command to send
     * @param args in command
     */
    public query(command: string, args?: Array<any>): Promise<QueryResult> {
        if (args === undefined)
            args = [];
        return new Promise((resolve, reject) => {
            this.client.query(command, args)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(createError('Database', 'Query failed', error));
            });
        });
    }

    /**
     * getSerial
     * @description get Table Serial
     * @param table where to find serial
     * @param key name of the serial
     */
    public getSerial(table: string, key: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.query(`SELECT currval(pg_get_serial_sequence($1, $2));`, [table, key])
            .then((result: QueryResult) => {
                resolve(result.rows[0].currval);
            })
            .catch((error) => {
                reject(createError('Firebase', 'Failed to get serial key', error));
            });
        });
    }
}

inject.register("Database", Database);
