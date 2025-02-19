const noNestedTernaryOperators = require(`${process.cwd()}/lib/rules/no-nested-ternary-operators`);
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('no-nested-ternary', noNestedTernaryOperators, {
  valid: [
    'const result = condition ? "a" : "b";',
  ],

  invalid: [
    {
      code: 'const result = condition1 ? "a" : condition2 ? "b" : "c";',
      errors: [{ messageId: 'nestedTernary' }],
    },
    {
      code: 'const result = condition1 ? (condition2 ? "a" : "b") : "c";',
      errors: [{ messageId: 'nestedTernary' }],
    },
    {
      code: 'const result = condition1 ? (condition2 ? "a" : "b") : (condition3 ? "x" : "y");',
      errors: [{ messageId: 'nestedTernary' }],
    },
  ],
});
