const preferEarlyReturn = require(`${process.cwd()}/lib/rules/prefer-early-return`);
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('prefer-early-return', preferEarlyReturn, {
    valid: ['function check(x) { if (!x) return; helloWorld(); }'],
    invalid: [
        {
            code: `
                function check(x) {
                    if (x) { helloWorld(); } 
                    else { return; }
                    }
                `,
            errors: [{ messageId: 'earlyReturn' }],
        },
    ],
});
