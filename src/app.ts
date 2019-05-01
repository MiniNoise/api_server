import injector from './injector';
import ExpressModule from './Modules/ExpressModule/ExpressModule';
import DatabaseModule from './Modules/Database/Database';
import Login from './Route/Auth/Login/Login';

/** This is the entrypoint */

const express   = injector.inject(ExpressModule);
const dataBase  = injector.inject(DatabaseModule);

Promise.all([
    express.init, 
    dataBase.init
]).then(() => {
    console.log("Done Init Base Modules");
})
.catch((error) => {
    console.error("Error Occured");
    console.error(error);
})