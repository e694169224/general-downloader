/* global describe it */

const assert = require('power-assert');
const downloader = require('./downloader.js');

describe('downloader.js', () => {
    it('shuld down baidu.com with gbk', async () => {
        const config = {
            url: 'https://www.baidu.com',
            method: 'GET',
            encoding: 'gbk',
            headers: {
                Accept: 'Application/json',
            },
            body: {
                content: 'eyJmb28iOiJiYXIifQ==',
                binaryEncoding: 'base64',
                type: 'Application/json',
            },
        };

        let content = null;
        try {
            content = await downloader(config);
        } catch (e) {
            //
        }

        assert(content.match('<!DOCTYPE html>') !== null, 'Not Fount Html');
    });

    it('shuld down baidu.com with gbk and https request', async () => {
        const config = {
            url: 'https://www.baidu.com',
            method: 'GET',
            encoding: 'gbk',
            headers: {
                Accept: 'Application/json',
            },
            body: {
                content: 'eyJmb28iOiJiYXIifQ==',
                binaryEncoding: 'base64',
                type: 'Application/json',
            },
        };

        let content = null;
        try {
            content = await downloader(config);
        } catch (e) {
            //
        }

        assert(content.match('<!DOCTYPE html>') !== null, 'Not Fount Html');
    });

    it('should error config json', async () => {
        const config = {
            utl: 'http://test111',
            method: 'GET',
        };

        try {
            await downloader(config);
        } catch (e) {
            assert(typeof e === 'object');
            assert(e[0].message === 'should be string');
        }
    });

    it('should error request', async () => {
        const config = {
            url: 'http://www.baidua.com',
            method: 'GET',
            encoding: 'gbk',
            headers: {
                Accept: 'Application/json',
            },
        };

        try {
            await downloader(config);
        } catch (e) {
            assert(e instanceof Error);
            assert.equal(e.message, 'getaddrinfo ENOTFOUND www.baidua.com www.baidua.com:80');
        }
    });
});
