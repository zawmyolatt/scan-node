const path = require('path');
const fs = require('fs');
const util = require('util');

var base_path = __dirname;

// Define promisify async function call
const fsReaddir = util.promisify(fs.readdir);
const fsReadFile = util.promisify(fs.readFile);
const fsLstat = util.promisify(fs.lstat);

// Using recursion, we find every file with the desired extention, even if its deeply nested in subfolders.
async function getFilesInDirectoryAsync(dir, ext) {
    let files = [];
    const filesFromDirectory = await fsReaddir(dir).catch(err => {
        throw new Error(err.message);
    });

    for (let file of filesFromDirectory) {
        const filePath = path.join(dir, file);
        const stat = await fsLstat(filePath);

        // If it is a directory, then will call recursive function for that dir. 
        // If it is a file and the extenstion is match, then it will add into the array of files.
        if (stat.isDirectory()) {
            const nestedFiles = await getFilesInDirectoryAsync(filePath, ext);
            files = files.concat(nestedFiles);
        } else {
            if (path.extname(file) === ext) {
                files.push(filePath);
            }
        }
    };
    
    return files;
}

async function searchFilesInDirectoryAsync(dir='./demo-files', filter='TODO', ext='.js') {  
    let foundFiles = [];
    //async check for selected directory is exist or not
    const checkDir = await fsReaddir(dir).catch(err => {
        throw new Error(err.message);
    });
    //get all selected extension files in this direcory using async resursive function
    const found = await getFilesInDirectoryAsync(dir, ext);

    for (file of found) {
        const fileContent = await fsReadFile(file);

        // Check full words match with regex.
        const regex = new RegExp('\\b' + filter + '\\b');
        if (regex.test(fileContent)) {
            console.log(base_path + '/' + file);
            foundFiles.push(base_path + '/' + file);
        }
    };
    return foundFiles;
}

module.exports.base_path = base_path;
module.exports.getFilesInDirectoryAsync = getFilesInDirectoryAsync;
module.exports.searchFilesInDirectoryAsync = searchFilesInDirectoryAsync;
module.exports.init = function () {
    searchFilesInDirectoryAsync(process.argv[2], process.argv[3], process.argv[4]);
};