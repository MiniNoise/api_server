import { booster } from '@booster-ts/core';
import inject from '__SOURCE__/injector';

@booster({
    init: true
})
export default class __NAME__ {

    private app: Express;

    constructor(
        private express: ExpressModule
    ) {
        this.app = this.express.getApp();
    }


    public init() {

    }
}

inject.register("__NAME__", __NAME__);
