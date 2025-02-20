const noLongElseIfChains = require(`${process.cwd()}/lib/rules/no-long-else-if-chains`);
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('no-long-else-if-chains', noLongElseIfChains, {
    valid: [
        'if (a) {}',
        'if (a) {} else if (b) {}',
        'if (a) {} else if (b) {} else if (c) {}',
        {
            code: 'if (a) {} else if (b) {} else if (c) {} else if (d) {}',
            options: [{ max: 4 }],
        },
    ],
    invalid: [
        {
            code: `
                  if (a) {} 
                  else if (b) {} 
                  else if (c) {} 
                  else if (d) {} 
              `,
            options: [{ max: 2 }],
            errors: [{ messageId: 'maxElseIf', line: 5, column: 24 }],
        },
        {
            code: `
                  if (a) {}
                  else if (b) {}
                  else if (c) {}
                  else if (d) {}
                  else if (e) {} 
              `,
            errors: [{ messageId: 'maxElseIf', line: 6, column: 24 }],
        },
        {
            code: `
                  if (a) {} 
                  else if (b) {} 
                  else if (c) {} 
                  else if (d) {} 
                  else if (e) {}
                  else if (f) {}
              `,
            options: [{ max: 4 }],
            errors: [{ messageId: 'maxElseIf', line: 7, column: 24 }],
        },
    ],
});
