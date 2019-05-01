import { booster } from '@booster-ts/core';
import inject from '../../../injector';
import ExpressModule from '../../../Modules/ExpressModule/ExpressModule';
import { Express, Request, Response } from 'express';

@booster({
    init: true
})
export default class Login {

    private app: Express;

    constructor(
        private express: ExpressModule
    ) {
        this.app = this.express.getApp();
    }

    public init() {
        this.app.post("/auth/login", this.login);
    }

    private login(req: Request, res: Response): void {
        res.send(200);
    }
}

inject.register("Login", Login);
