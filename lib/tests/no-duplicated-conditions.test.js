const noDuplicatedConditions = require(`${process.cwd()}/lib/rules/no-duplicated-conditions`);
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('no-duplicated-conditions', noDuplicatedConditions, {
    valid: ['if (a) {} else if (b) {}'],
    invalid: [
        {
            code: 'if (a) {} else if (a) {}',
            errors: [{ messageId: 'duplicate' }],
        },
    ],
});
