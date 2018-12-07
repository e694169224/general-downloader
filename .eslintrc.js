module.exports = {
    extends: 'airbnb',
    rules: {
        indent: ['error', 4],
        'no-underscore-dangle': [
            'error', {
                allowAfterThis: true,
                allowAfterSuper: true,
                enforceInMethodNames: false,
            },
        ],
        'arrow-body-style': [
            'off',
        ],
        'arrow-parens': [
            'error', 'as-needed',
        ],
        'no-lonely-if': ['off'],
        'no-param-reassign': ['off'],
        'no-shadow': ['off'],
        'global-require': ['off'],
        'object-curly-spacing': ['off'],
        'no-else-return': ['off'],
        'no-unused-vars': [
            'error', {
                args: 'none',
                ignoreRestSiblings: true,
            },
        ],
        'array-bracket-spacing': ['off'],
        'no-console': ['off'],
        'no-await-in-loop': ['off'],
    },
    overrides: [
        {
            files: ['test/**/*.js'],
            env: {
                mocha: true,
            },
        },
    ],
};
