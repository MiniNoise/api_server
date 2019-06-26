import injector, { loadFiles } from './injector';
import ExpressModule from './Modules/Express/Express';
import Database from './Modules/Database/Database';

/** This is the entrypoint */
const express = injector.inject(ExpressModule);
const database = injector.inject(Database);

Promise.all([
    express.init(),
    database.init()
])
.then(() => {
    loadFiles("./Routes");
    const routes = injector.getContainerByValue('type', 'Route');
    routes.forEach((route) => {
        route.class.init();
    });
    // tslint:disable-next-line: no-console
    console.log("App Started");
})
.catch((error) => {
    console.log(error);
    process.exit(84);
});
