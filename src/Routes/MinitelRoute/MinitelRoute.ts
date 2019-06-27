import { booster } from '@booster-ts/core';
import inject from '../../injector';
import { Express, Request, Response } from 'express';
import ExpressModule from '../../Modules/Express/Express';
import Session from '../../Services/Session/Session';
import MinitelService from '../../Services/MinitelService/MinitelService';

@booster({
    type: "Route"
})
export default class MinitelRoute {

    /** Express app */
    public app: Express;

    constructor(
        express: ExpressModule,
        private session: Session,
        private minitel: MinitelService
    ) {
        this.app = express.getApp();
    }

    /**
     * init
     * @description Init MinitelRoute Routes
     */
    public init(): void {
        this.app.post('/api/v1/minitel', this.register.bind(this));
        this.app.get('/api/v1/minitel/:email', this.getMinitels.bind(this));
        this.app.delete('/api/v1/minitel/:uid', this.removeMinitel.bind(this));
    }

    /**
     * register
     * @param req HTTP Request
     * @param res HTTP Response
     */
    private register(req: Request, res: Response): void {
        const name: string = req.body.name;
        const uid: string = req.body.uid;
        const email: string = req.body.email;
        const token: string = req.headers.authorization;

        this.session.validateUser(email, token)
        .then((idUser) => {
            return this.minitel.register(name, uid, idUser);
        })
        .then(() => {
            res.json({
                code: "00",
                text: "Added new Minitel"
            });
        })
        .catch((error) => {
            res.status(500).json({code: "02", text: "Error"});
        });
    }

    /**
     * getMinitels
     * @description Recover users minitels
     * @param req HTTP Request
     * @param res HTTP Response
     */
    private getMinitels(req: Request, res: Response): void {
        const email = req.params.email;
        const token = req.headers.authorization;

        this.session.validateUser(email, token)
        .then((idUser) => {
            return this.minitel.getMinitels(idUser);
        })
        .then((minitels) => {
            res.json({
                code: "00",
                text: "Recovered Minitel's",
                data: minitels
            });
        })
        .catch((error) => {
            res.status(500).json({
                code: "00",
                text: "Failed to recover minitels"
            });
        });
    }

    /**
     * removeMinitel
     * @description Delete minitel
     * @param req HTTP Request
     * @param res HTTP Response
     */
    private removeMinitel(req: Request, res: Response): void {
        const email = req.body.email;
        const token = req.headers.authorization;
        const uid = req.params.uid;

        this.session.validateUser(email, token)
        .then((idUser) => {
            return this.minitel.removeMinitel(uid, idUser);
        })
        .then(() => {
            res.json({
                code: "00",
                text: "Removed minitel"
            });
        })
        .catch((error) => {
            res.status(500).json({code: "02", text: "Error"});
        });
    }
}

inject.register("MinitelRoute", MinitelRoute);