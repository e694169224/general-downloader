const Ajv = require('ajv');
const fs = require('fs');

const schema = JSON.parse(fs.readFileSync('./schema/config.json', {
    encoding: 'utf8',
}));
const config = {
    url: 'http://www.example.org/example.html',
    method: 'POST',
    headers: {
        Accept: 'Application/json',
    },
    body: {
        content: 'eyJmb28iOiJiYXIifQ==',
        binaryEncoding: 'base64',
        type: 'Application/json',
    },
    referrer: 'http://www.example.org/',
    settings: {
        authRequired: true,
        proxy: {
            method: 'https',
        },
    },
    encoding: 'utf8',
};

const ajv = new Ajv();
const validate = ajv.compile(schema);
const valid = validate(config);
console.log(valid, validate.errors);
