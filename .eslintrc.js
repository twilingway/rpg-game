module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'object-curly-newline': ['off', {
      ObjectExpression: 'always',
      ObjectPattern: { 'multiline': true,  },
      ImportDeclaration: 'never',
      consistent: true,
      ExportDeclaration: {
        multiline: false,
        minProperties: 3,
      },
    }],
  },
};
