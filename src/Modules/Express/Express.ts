import { booster } from '@booster-ts/core';
import inject from '../../injector';
import express, { Express } from 'express';
import bodyParser = require('body-parser');

/**
 * ExpressModule
 * @description Express Wrapper
 * @author ImOverlord
 */
@booster()
export default class ExpressModule {

    /**
     * Express App
     */
    private app: Express;

    constructor() {
        this.app = express();
    }

    /**
     * init
     * @description init Express app
     */
    public init(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.app.listen(3001, () => {
                this.app.use(bodyParser.json());
                resolve();
            })
            .once('error', (error) => {
                reject(error);
            });
        });
    }

    /**
     * getApp
     * @description Returns Express app
     */
    public getApp(): Express {
        return this.app;
    }
}

inject.register("ExpressModule", ExpressModule);
