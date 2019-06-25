import { booster } from '@booster-ts/core';
import inject from '__SOURCE__/injector';
import { Express } from 'express';
import ExpressModule from '__SOURCE__/Modules/Express/Express';

@booster({
    type: "Route"
})
export default class __NAME__ {

    /** Express app */
    public app: Express;

    constructor(
        express: ExpressModule
    ) {
        this.app = express.getApp();
    }

    /**
     * init
     * @description Init __NAME__ Routes
     */
    public init(): void {

    }
}

inject.register("__NAME__", __NAME__);
