const noEval = require(`${process.cwd()}/lib/rules/no-eval`);
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('no-eval', noEval, {
    valid: [],
    invalid: [
        {
            code: 'eval(\'console.log("Hi")\');',
            errors: [{ messageId: 'noEval' }],
        },
        {
            code: "window['eval']('console.log(\"Not Allowed\")');",
            errors: [{ messageId: 'noEval' }],
        },
        {
            code: "globalThis['eval']('console.log(\"Not Allowed\")');",
            errors: [{ messageId: 'noEval' }],
        },
        {
            code: 'const exec = eval; exec(\'console.log("Not Allowed")\');',
            errors: [{ messageId: 'noEval' }],
        },
        {
            code: 'const safeEval = eval; safeEval(\'console.log("Allowed")\');',
            errors: [{ messageId: 'noEval' }],
        },
    ],
});
