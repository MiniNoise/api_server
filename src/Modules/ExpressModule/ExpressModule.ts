import { booster } from '@booster-ts/core';
import inject from '../../injector';
import express, { Express } from 'express';

@booster()
export default class ExpressModule {

    private app: Express;

    constructor() {
        this.app = express();
    }

    public init() {
        return new Promise((resolve, reject) => {
            this.app.listen(3000, (error: any) => {
                if (error)
                    reject(error);
                else
                    resolve();
            })
        });
    }

    public getApp(): Express {
        return this.app;
    }
}

inject.register("ExpressModule", ExpressModule);
