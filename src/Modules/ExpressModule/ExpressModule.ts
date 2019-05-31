import { booster } from '@booster-ts/core';
import inject from '../../injector';
import express, { Express } from 'express';
import { Server } from 'http';
import * as bodyParser from 'body-parser';

@booster()
export default class ExpressModule {

    private app: Express;
    private server: Server;
    private port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.SERVER_PORT) || 3000;
    }

    public init() {
        return new Promise((resolve, reject) => {
            this.app.listen(this.port, () => {
                this.app.use(bodyParser.json());
                resolve();
            })
            .once('error', (error) => {
                reject(error);
            });
        });
    }

    public getApp(): Express {
        return this.app;
    }
}

inject.register("ExpressModule", ExpressModule);
