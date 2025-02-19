const noExcessiveNestedConditionals = require(`${process.cwd()}/lib/rules/no-excessive-nested-conditionals`);
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('no-excessive-nested-conditionals', noExcessiveNestedConditionals, {
  valid: ['if (a) { if (b) { if (c) { doSomething(); } } }', 'if (a) {} else if (b) {} else if (c) {} else if (d) {}'],
  invalid: [
    {
      code: `
                  if (a) { 
                      if (b) { 
                          if (c) { 
                              if (d) { doSomething(); } 
                          } 
                      } 
                  } else if (b) {} else if (c) {} else if (d) {};
              `,
      errors: [{ messageId: 'deep', line: 5, column: 31 }],
    },
    {
      code: `
                  if (a) { 
                      if (a) { 
                          if (b) { 
                              if (c) { 
                                  if (d) { doSomething(); } 
                              } 
                          } 
                      } 
                  } else if (b) {} else if (c) {} else if (d) {};
              `,
      errors: [
        { messageId: 'deep', line: 5, column: 31 },
        { messageId: 'deep', line: 6, column: 35 },
      ],
    },
  ],
});
