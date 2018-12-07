const Ajv = require('ajv');
const fs = require('fs');
const http = require('http');
const https = require('https');
const URL = require('url');
const { TextDecoder } = require('util');
const path = require('path');

const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '../schema/config.json'), {
    encoding: 'utf8',
}));

const ajv = new Ajv();
const validate = ajv.compile(schema);

const methods = {
    'http:': http,
    'https:': https,
};

/**
 * env NODE_ICU_DATA=node_modules\full-icu
 */
module.exports = async config => {
    const valid = validate(config);
    if (!valid) {
        throw (validate.errors);
    }

    const url = URL.parse(config.url);
    const options = {
        hostname: url.hostname,
        protocol: url.protocol,
        port: url.port || url.protocol === 'http:' ? 80 : 443,
        method: config.method || 'GET',
        path: url.path,
        headers: config.headers || {},
    };

    try {
        const result = await new Promise((resolve, reject) => {
            const req = methods[options.protocol].request(options, res => {
                const buf = [];
                buf.size = 0;

                res.on('data', chunk => {
                    buf.push(chunk);
                    buf.size += chunk.length;
                });

                res.on('end', () => {
                    const data = Buffer.concat(buf, buf.size);
                    const decoder = new TextDecoder(config.encoding || 'utf-8');
                    const res = decoder.decode(data);
                    return resolve(res);
                });
            });

            req.on('error', e => {
                return reject(e);
            });

            if (config.referrer) {
                req.setHeader('referer', config.referrer);
            }

            if (config.body) {
                let {content} = config.body;
                const {binaryEncoding, type} = config.body;

                if (binaryEncoding) {
                    const buffer = Buffer.from(content, binaryEncoding);
                    content = buffer.toString();
                }

                if (type) {
                    req.setHeader('Content-Type', type);
                }

                req.write(content);
            }


            req.end();
        });

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

