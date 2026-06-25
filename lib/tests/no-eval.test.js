const noEval = require(`${process.cwd()}/lib/rules/no-eval`);
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('no-eval', noEval, {
    valid: [
        // Strings that merely contain the substring "eval" must NOT be flagged.
        'const url = "https://example.com/retrieval";',
        'const msg = "evaluation complete";',
        'const word = "medieval";',
        'const obj = { eval: 1 }; const v = obj.eval;',
        'function evaluate() {} evaluate();',
        'const x = foo.eval;',
    ],
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
            code: 'window.eval("1 + 1");',
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
        {
            code: 'const fn = new Function("return 1");',
            errors: [{ messageId: 'noFunction' }],
        },
    ],
});
