import { booster } from '@booster-ts/core';
import inject from '__SOURCE__/injector';

@booster()
export default class __NAME__Module {

    constructor() { }
}

inject.register("__NAME__Module", __NAME__Module);
