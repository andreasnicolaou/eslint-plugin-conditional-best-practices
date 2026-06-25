const requireDefaultInSwitch = require(`${process.cwd()}/lib/rules/require-default-in-switch`);
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('require-default-in-switch', requireDefaultInSwitch, {
    valid: ['switch (x) { case 1: break; default: break; }'],
    invalid: [
        {
            code: 'switch (x) { case 1: break; case 2: break; }',
            errors: [
                {
                    messageId: 'missing',
                    suggestions: [
                        {
                            messageId: 'addDefault',
                            output: 'switch (x) { case 1: break; case 2: break; default: break; }',
                        },
                    ],
                },
            ],
        },
        {
            code: 'switch (x) { case 1: break; case 2: break; default: }',
            errors: [{ messageId: 'empty' }],
        },
    ],
});
