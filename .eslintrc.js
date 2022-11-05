module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        "plugin:prettier/recommended",
        "airbnb-base",
        "eslint-config-next",
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {},
};
