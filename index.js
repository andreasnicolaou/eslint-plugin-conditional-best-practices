'use strict';
const rules = require('./lib/rules');

module.exports = {
    rules,
    configs: {
        recommended: {
            rules: {
                '@andreasnicolaou/conditional-best-practices/no-excessive-nested-conditionals': 'warn',
                '@andreasnicolaou/conditional-best-practices/no-long-else-if-chains': 'warn',
                '@andreasnicolaou/conditional-best-practices/require-default-in-switch': 'warn',
                '@andreasnicolaou/conditional-best-practices/no-constant-conditionals': 'error',
                '@andreasnicolaou/conditional-best-practices/prefer-early-return': 'warn',
                '@andreasnicolaou/conditional-best-practices/no-duplicated-conditions': 'error',
                '@andreasnicolaou/conditional-best-practices/no-useless-ternary': 'warn',
                '@andreasnicolaou/conditional-best-practices/no-nested-ternary-operators': 'warn',
                '@andreasnicolaou/conditional-best-practices/no-eval': 'error',
            },
        },
    },
};
