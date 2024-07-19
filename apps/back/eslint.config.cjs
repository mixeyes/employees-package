
module.exports = {
    root: true,
    extends: ['@repo/eslint-config/next.js', 'plugin:security/recommended-legacy'],
    plugins: ['@typescript-eslint', 'security'],
    rules:
        { 'node/no-unsupported-features/es-syntax': 'off' }
    ,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json"
    }
};
// "lint": "ESLINT_USE_FLAT_CONFIG=false eslint --config eslint.config.cjs src/",
