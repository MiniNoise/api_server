import { booster } from '@booster-ts/core';
import inject from '../../injector';
import * as pg from 'pg';

@booster()
export default class DatabaseModule {

    private connection_url: string;
    private client: pg.Client;

    constructor() {
        this.client = new pg.Client({
            password: process.env.DATABASE_PASSWORD,
            user: process.env.DATABASE_USER,
            database: process.env.DATABASE_NAME,
            host: "postgres",
          });
    }

    public init(): Promise<void> {
        return this.client.connect();
    }

    public getClient(): pg.Client {
        return this.client;
    }

    public query(query_string: string, args?: Array<any>): Promise<pg.QueryResult> {
        if (!args)
            args = [];
        return this.client.query(query_string, args);
    }
}

inject.register("DatabaseModule", DatabaseModule);
