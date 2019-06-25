import { booster } from '@booster-ts/core';
import inject from '../../injector';
import uuid = require('uuid/v4');

/**
 * Utils
 * @description Utilitary Code
 * @author ImOverlord
 */
@booster()
export default class Utils {

    constructor() { }

    /**
     * createToken
     * @description Create A Random Token
     */
    public createToken(): string {
        return uuid();
    }

    /**
     * validateFields
     * @description Checks if value is defined
     * @param values List of values to check
     */
    public validateFields(...values: Array<any>): boolean {
        for (const value of values) {
            if (value === undefined)
                return false;
            if (value === null)
                return false;
        }
        return true;
    }
}

inject.register("Utils", Utils);
