module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended', // Si tu utilises React
        'plugin:@typescript-eslint/recommended', // Si tu utilises TypeScript
        'prettier' // Intégration avec Prettier
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': ['error', {
            singleQuote: true,
            semi: true,
            trailingComma: 'es5',
            arrowParens: 'always',
        }],
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        'semi': ['error', 'always'] // Imposer les ;
    },
};
