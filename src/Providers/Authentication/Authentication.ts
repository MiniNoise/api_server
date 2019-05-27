import { booster } from '@booster-ts/core';
import inject from '../../injector';
import DatabaseModule from '../../Modules/Database/Database';

@booster()
export default class Authentication {

    constructor(
        private database: DatabaseModule
    ) { }

    public login() {

    }

    public register() {
        
    }

}

inject.register("Authentication", Authentication);
