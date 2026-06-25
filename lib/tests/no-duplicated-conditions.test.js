const noDuplicatedConditions = require(`${process.cwd()}/lib/rules/no-duplicated-conditions`);
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('no-duplicated-conditions', noDuplicatedConditions, {
    valid: ['if (a) {} else if (b) {}', 'if (a > b) {} else if (a < b) {}', 'if (x === 1) {} else if (x === 2) {}'],
    invalid: [
        {
            code: 'if (a) {} else if (a) {}',
            errors: [{ messageId: 'duplicate' }],
        },
        {
            code: 'if (a > b) {} else if (a > b) {}',
            errors: [{ messageId: 'duplicate' }],
        },
        {
            code: 'if (x === 1) {} else if (y) {} else if (x === 1) {}',
            errors: [{ messageId: 'duplicate' }],
        },
    ],
});
