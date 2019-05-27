import { booster } from '@booster-ts/core';
import inject from '../../../injector';
import ExpressModule from '../../../Modules/ExpressModule/ExpressModule';
import { Express, Request, Response } from 'express';
import { IResponse } from '../../../Modules/Response/IResponse'

@booster({
    init: true
})
export default class Register {

    private app: Express;

    constructor(
        private express: ExpressModule
    ) {
        this.app = this.express.getApp();
    }


    public init() {
        this.app.post("/auth/login", this.register);
    }

    private register(req: Request, res: Response): void {
        const response: IResponse = {
            code: "00",
            text: "Register OK"
        };
        res.send(200);
    }
}

inject.register("Register", Register);
