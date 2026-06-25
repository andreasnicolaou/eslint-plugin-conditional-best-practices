const noUselessTernary = require(`${process.cwd()}/lib/rules/no-useless-ternary`);
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('no-useless-ternary', noUselessTernary, {
    valid: [
        'const isEnabled = condition1 ? "yes" : "no";',
        'const x = a ? 1 : 0;',
        'const y = a ? true : someValue;',
        'const z = a ? b : false;',
    ],
    invalid: [
        {
            code: 'const isActive = condition2 ? true : false;',
            output: 'const isActive = condition2;',
            errors: [{ messageId: 'uselessTernary' }],
        },
        {
            code: 'const isInactive = condition3 ? false : true;',
            output: 'const isInactive = !condition3;',
            errors: [{ messageId: 'uselessTernary' }],
        },
        {
            code: 'const isReady = a && b ? false : true;',
            output: 'const isReady = !(a && b);',
            errors: [{ messageId: 'uselessTernary' }],
        },
        {
            code: 'const ok = isValid() ? true : false;',
            output: 'const ok = isValid();',
            errors: [{ messageId: 'uselessTernary' }],
        },
    ],
});
