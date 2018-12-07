
```javascript
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
    referrer: '',
    settings: {
        authRequired: true,
        proxy: {
            method: 'https',
        },
    },
    encoding: 'utf8',
};
const res = await download(config); // res 为下载的内容
```

```json
{
    "$id": "http://schema.yiyi.technology/config.json",
    "oneOf": [
        {
            "type": "string",
            "format": "url"
        },
        {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "format": "url"
                },
                "method": {
                    "type": "string",
                    "emun": ["GET", "POST", "PUT"]
                },
                "headers": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                },
                "body": {
                    "oneOf": [
                        {
                            "type": "string"
                        },
                        {
                            "type": "object",
                            "properties": {
                                "content": {
                                    "type": "string"
                                },
                                "binaryEncoding": {
                                    "type": "string",
                                    "emun": ["base64"]
                                },
                                "type": {
                                    "type": "string"
                                }
                            },
                            "additionalProperties": false,
                            "required": ["content"]
                        }
                    ]
                },
                "referrer": {
                    "type": "string",
                    "format": "url"
                },
                "settings": {
                    "type": "object",
                    "properties": {
                        "authRequired": {
                            "type": "boolean"
                        },
                        "proxy": {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "number",
                                    "emun": [0, 1, 2, 3, 4]
                                }
                            }
                        }
                    }
                },
                "encoding": {
                    "type": "string"
                }
            },
            "required": ["url"]
        }
    ]
}
```
