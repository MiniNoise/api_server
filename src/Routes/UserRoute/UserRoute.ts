import { booster } from '@booster-ts/core';
import inject from '../../injector';
import { Express, Request, Response } from 'express';
import ExpressModule from '../../Modules/Express/Express';
import Utils from '../../Modules/Utils/Utils';
import UserService from '../../Services/UserService/UserService';

/**
 * UserRoute
 * @description Route For User Service
 * @author ImOverlord
 * @doc User.md
 */
@booster({
    type: "Route"
})
export default class UserRoute {

    /** Express app */
    public app: Express;

    constructor(
        express: ExpressModule,
        private user: UserService,
        private utils: Utils
    ) {
        this.app = express.getApp();
    }

    /**
     * init
     * @description Init UserRoute Routes
     */
    public init(): void {
        this.app.post('/api/v1/user', this.register.bind(this));
        this.app.post('/api/v1/user/:email', this.login.bind(this));
    }

    /**
     * register
     * @description Endpoint for User Register
     * @param req HTTP Request
     * @param res HTTP Response
     */
    private register(req: Request, res: Response): void {
        const email = req.body.email;
        const password = req.body.password;

        if (!this.utils.validateFields(email)) {
            res.status(500).json({code: "01", text: "Value Missing"});
            return;
        }
        this.user.register(email, password)
        .then((token) => {
            res.json({
                code: "00",
                text: "Register Successful",
                data: {
                    session: token
                }
            });
        })
        .catch((error) => {
            res.status(500).json({code: "02", text: "Error"});
        });
    }

    /**
     * login
     * @description Login Endpoint
     * @param req HTTP Request
     * @param res HTTP Response
     */
    private login(req: Request, res: Response): void {
        const email = req.params.email;
        const password = req.body.password;

        if (!this.utils.validateFields(email)) {
            res.status(500).json({code: "01", text: "Value Missing"});
            return;
        }
        this.user.login(email, password)
        .then((token) => {
            res.json({
                code: "00",
                text: "Login Successful",
                data: {
                    session: token
                }
            });
        })
        .catch((error) => {
            res.status(500).json({code: "02", text: "Error"});
        });
    }
}

inject.register("UserRoute", UserRoute);
