module.exports = {
    arrowParens: 'always',
    bracketSpacing: true,
    endOfLine: 'lf',
    printWidth: 80,
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
    useTabs: false,
    overrides: [
      {
        files: ['*.py'],
        options: {
          tabWidth: 4,
        },
      },
    ],
};