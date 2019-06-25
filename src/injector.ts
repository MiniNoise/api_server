import { Injector } from '@booster-ts/core';
import * as fs from 'fs';
import * as path from 'path';

const inject = new Injector();
export default inject;

/**
 * loadFiles
 * @param dirName Folder to import
 */
export function loadFiles(dirName: string): void {
    let fileLoaded = false;
    let relativeDir;
    if (!path.isAbsolute(dirName))
        relativeDir = path.join(__dirname, dirName);
    else
        relativeDir = dirName;
    const contents = fs.readdirSync(relativeDir);
    for (const content of contents) {
        const filePath = path.join(relativeDir, content);
        if (fs.statSync(filePath).isDirectory())
            loadFiles(filePath);
        else if (!fileLoaded) {
            require(path.join(dirName, path.basename(dirName)));
            fileLoaded = true;
        }
    }
}
