const noUselessTernary = require(`${process.cwd()}/lib/rules/no-useless-ternary`);
const { RuleTester } = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('no-useless-ternary', noUselessTernary, {
  valid: ['const isEnabled = condition1 ? "yes" : "no";'],
  invalid: [
    {
      code: 'const isActive = condition2 ? true : false;',
      errors: [{ messageId: 'uselessTernary' }],
    },
    {
      code: 'const isInactive = condition3 ? false : true;',
      errors: [{ messageId: 'uselessTernary' }],
    },
  ],
});
