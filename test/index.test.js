const scanner = require('../index');
const chai = require('chai')
const assert = require('assert');
const expect = chai.expect

describe('#getFilesInDirectoryAsync()', () => {
    it('should throw error for invalid directory', async () => {
        try {
            await scanner.getFilesInDirectoryAsync('./dummy-files', '.js');
        } catch (e) {
            expect(e).to.be.instanceOf(Error);
            expect(e.message).to.eql('ENOENT: no such file or directory, scandir \'./dummy-files\'');
        }
    });
    it('responds with matching .js files in all directories', () => {
        return scanner.getFilesInDirectoryAsync('./demo-files', '.js').then(result => {
            assert.deepStrictEqual(result, [
                'demo-files/empty.js',
                'demo-files/invalid-js.js',
                'demo-files/sub-folder/empty.js',
                'demo-files/sub-folder/invalid-js.js',
                'demo-files/sub-folder/valid-js.js',
                'demo-files/valid-js.js',
            ]);
        });
    });
});

describe('#searchFilesInDirectoryAsync()', () => {
    it('should throw error for invalid directory', async () => {
        try {
            await scanner.searchFilesInDirectoryAsync('./dummy-files', 'TODO', '.js');
        } catch (e) {
            expect(e).to.be.instanceOf(Error);
            expect(e.message).to.eql('ENOENT: no such file or directory, scandir \'./dummy-files\'');
        }
    });
    it('responds filtered matching .js files in all directories', () => {
        return scanner.searchFilesInDirectoryAsync('./demo-files', 'TODO', '.js').then(result => {
            assert.deepStrictEqual(result, [
                scanner.base_path + '/demo-files/sub-folder/valid-js.js',
                scanner.base_path + '/demo-files/valid-js.js',
            ]);
        });
    });
});