# @andreasnicolaou/eslint-plugin-conditional-best-practices

This ESLint plugin includes several opinionated rules aimed at enhancing the readability, performance, and maintainability of conditionals in JavaScript.

These rules focus on writing clear and efficient conditional statements, so while they encourage consistency and simplicity, they may not suit every coding style. Feel free to adjust the rules based on your team's preferences.

# Installation

Install the npm package

```bash
# If eslint is installed globally
npm install -g @andreasnicolaou/eslint-plugin-conditional-best-practices

# If eslint is installed locally
npm install -D @andreasnicolaou/eslint-plugin-conditional-best-practices
```

To use this plugin in your project, add it to your ESLint configuration like this:

```js
{
  "plugins": ["@andreasnicolaou/conditional-best-practices"],
  "extends": [
    "plugin:@andreasnicolaou/conditional-best-practices/recommended"
  ]
}

```

- Alternatively, you can extend individual rules if you prefer more granular control.

# Usage

This plugin enforces the following opinionated best practices:

| Name                                                                         | Description                                                                                 |
| :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| [no-constant-conditionals](docs/no-constant-conditionals.md)                 | This rule disallows conditionals that always evaluate to true or false.                     |
| [no-duplicated-conditions](docs/no-duplicated-conditions.md)                 | This rule disallows duplicate conditions in if-else chains.                                 |
| [no-excessive-nested-conditionals](docs/no-excessive-nested-conditionals.md) | This rule disallows excessive nesting of conditionals in order to improve code readability. |
| [no-long-else-if-chains](docs/no-long-else-if-chains.md)                     | This rule limits the number of consecutive else-if statements.                              |
| [no-nested-ternary-operators](docs/no-nested-ternary-operators.md)           | This rule disallows nested ternary operators.                                               |
| [no-useless-ternary](docs/no-useless-ternary.md)                             | This rule disallows unnecessary ternary expressions.                                        |
| [prefer-early-return](docs/prefer-early-return.md)                           | This rule encourages the use of early returns instead of deeply nested if-else blocks.      |
| [require-default-in-switch](docs/require-default-in-switch.md)               | This rule ensures that switch statements include a default case and/or its not empty.       |
| [no-eval](docs/no-eval.md)                                                   | This rule disallows the use of eval() due to security risks.                                |

# Autofixing

Currently, this plugin does not support automatic fixes for code violations. It only detects incorrect usage and warns you, helping to maintain consistency and best practices in your codebase.
