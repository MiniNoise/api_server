import { booster } from '@booster-ts/core';
import inject from '../../injector';
import Database from '../../Modules/Database/Database';
import { createError } from '../../Models/IError';
import { createMinitel, addOwner, getMachines, getMachine, checkOwnership, deleteMachine } from './Query';
/**
 * MinitelService
 * @description Minitel Handler
 * @author ImOverlord
 */
@booster()
export default class MinitelService {

    constructor(
        private db: Database
    ) { }

    /**
     * register
     * @description Register new Minitel
     * @param name Mintel name
     * @param uid Minitel UID
     * @param idUser of the owner
     */
    public register(name: string, uid: string, idUser: number): Promise<any> {
        return this.db.query(createMinitel, [name, uid])
        .then((idMachine) => {
            return this.addOwner(uid, idUser);
        });
    }

    /**
     * addOwner
     * @description Adds a new owner to a minitel
     * @param uid of the machine
     * @param idUser of the owner to be added
     */
    public addOwner(uid: string, idUser: number): Promise<any> {
        return this.getMachineFromUID(uid)
        .then((idMachine) => {
            return this.db.query(addOwner, [idMachine, idUser]);
        });
    }

    /**
     * getMinitels
     * @description Get Mintels of specific owner
     * @param idUser of the owner
     */
    public getMinitels(idUser: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.query(getMachines, [idUser])
            .then((result) => {
                resolve(result.rows);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    /**
     * removeMachine
     * @description Removes machine
     * @param uid of the machine
     * @param idUser of the minitel's owner
     */
    public removeMinitel(uid: string, idUser: number): Promise<any> {
        let idMachine: number;

        return this.getMachineFromUID(uid)
        .then((machine) => {
            idMachine = machine;
            return this.isOwner(idMachine, idUser);
        })
        .then(() => {
            return this.db.query(deleteMachine, [idMachine]);
        });
    }

    /**
     * getMachineFromUid
     * @description Gets Machine from it's UID
     * @param uid of the machine
     * @todo Improve Promise System
     */
    private getMachineFromUID(uid: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.db.query(getMachine, [uid])
            .then((result) => {
                if (result.rowCount === 1)
                    resolve(result.rows[0].idMachine);
                else
                    reject(createError('Minitel', "Failed to find Machine"));
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    /**
     * isOwner
     * @description Checks if user owns machine
     * @param idMachine of the machine to check
     * @param idUser of the machine owner
     */
    private isOwner(idMachine: number, idUser: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.query(checkOwnership, [idMachine, idUser])
            .then((result) => {
                if (result.rowCount >= 1)
                    resolve();
                else
                    reject(createError('Minitel', "Failed to validate user owns machine"));
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}

inject.register("MinitelService", MinitelService);
