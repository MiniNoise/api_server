import { booster } from '@booster-ts/core';
import inject from '../../injector';
import * as pg from 'pg';

@booster()
export default class DatabaseModule {

    private connection_url: string | undefined;
    private client: pg.Client;

    constructor() {
        this.connection_url = process.env.DATABASE_URL;
        this.client = new pg.Client(this.connection_url);
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
