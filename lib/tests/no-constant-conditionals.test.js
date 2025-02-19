const noConstantConditionals = require(`${process.cwd()}/lib/rules/no-constant-conditionals`);
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('no-constant-conditionals', noConstantConditionals, {
  valid: ['const name = "andreas"; const x = "hello"; if (x === name) { sayHi(); }'],
  invalid: [
    {
      code: 'if (true) { sayHi(); }',
      errors: [{ messageId: 'constant' }],
    },
    {
      code: 'if (false) { sayHi(); }',
      errors: [{ messageId: 'constant' }],
    },
  ],
});
