# @andreasnicolaou/eslint-plugin-conditional-best-practices

Opinionated ESLint rules for **cleaner, safer conditionals** — limit nesting, prefer early returns, catch duplicate and constant conditions, simplify ternaries, and flag risky `eval`.

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/andreasnicolaou/eslint-plugin-conditional-best-practices/build.yaml)](https://github.com/andreasnicolaou/eslint-plugin-conditional-best-practices/actions/workflows/build.yaml)
![NPM Version](https://img.shields.io/npm/v/%40andreasnicolaou%2Feslint-plugin-conditional-best-practices)
![NPM Downloads](https://img.shields.io/npm/dm/%40andreasnicolaou%2Feslint-plugin-conditional-best-practices)
![NPM License](https://img.shields.io/npm/l/%40andreasnicolaou%2Feslint-plugin-conditional-best-practices)

> Zero runtime dependencies. Works with ESLint **flat config** (ESLint 9, and 8.21+) and legacy `.eslintrc`.

These rules focus on writing clear and efficient conditional statements. They are intentionally opinionated, so feel free to enable only the ones that suit your team.

## Installation

```bash
npm install -D @andreasnicolaou/eslint-plugin-conditional-best-practices
```

## Usage

### Flat config (`eslint.config.js`) — ESLint 9+ (recommended)

The quickest way is to extend the bundled `recommended` config, which registers the plugin and turns on every rule at sensible severities:

```js
// eslint.config.js
import conditional from '@andreasnicolaou/eslint-plugin-conditional-best-practices';

export default [conditional.configs.recommended];
```

Prefer granular control? Register the plugin and pick rules yourself:

```js
// eslint.config.js
import conditional from '@andreasnicolaou/eslint-plugin-conditional-best-practices';

export default [
    {
        plugins: {
            '@andreasnicolaou/conditional-best-practices': conditional,
        },
        rules: {
            '@andreasnicolaou/conditional-best-practices/no-eval': 'error',
            '@andreasnicolaou/conditional-best-practices/no-excessive-nested-conditionals': ['warn', { max: 3 }],
            '@andreasnicolaou/conditional-best-practices/prefer-early-return': 'warn',
        },
    },
];
```

CommonJS works the same way with `require`:

```js
const conditional = require('@andreasnicolaou/eslint-plugin-conditional-best-practices');
module.exports = [conditional.configs.recommended];
```

There is also a `conditional.configs.all` config that enables **every** rule as an `error`.

### Legacy config (`.eslintrc`)

```jsonc
{
    "plugins": ["@andreasnicolaou/conditional-best-practices"],
    "extends": ["plugin:@andreasnicolaou/conditional-best-practices/legacy-recommended"],
}
```

## Rules

✅ = enabled in `recommended` · 🔧 = autofixable · 💡 = has editor suggestions

| Name                                                                         | Description                                                          | Recommended | Fixable |
| :--------------------------------------------------------------------------- | :------------------------------------------------------------------- | :---------: | :-----: |
| [no-constant-conditionals](docs/no-constant-conditionals.md)                 | Disallow conditionals that always evaluate to true or false.         |     ✅      |         |
| [no-duplicated-conditions](docs/no-duplicated-conditions.md)                 | Disallow duplicate conditions in `if`/`else if` chains.              |     ✅      |         |
| [no-excessive-nested-conditionals](docs/no-excessive-nested-conditionals.md) | Disallow excessive nesting of conditionals (configurable `max`).     |     ✅      |         |
| [no-long-else-if-chains](docs/no-long-else-if-chains.md)                     | Limit the number of consecutive `else if` statements (configurable). |     ✅      |         |
| [no-nested-ternary-operators](docs/no-nested-ternary-operators.md)           | Disallow nested ternary operators.                                   |     ✅      |         |
| [no-useless-ternary](docs/no-useless-ternary.md)                             | Disallow unnecessary boolean ternaries (`x ? true : false`).         |     ✅      |   🔧    |
| [prefer-early-return](docs/prefer-early-return.md)                           | Encourage early returns instead of deeply nested `if`/`else` blocks. |     ✅      |         |
| [require-default-in-switch](docs/require-default-in-switch.md)               | Require a non-empty `default` case in `switch` statements.           |     ✅      |   💡    |
| [no-eval](docs/no-eval.md)                                                   | Disallow `eval()` and the `Function` constructor (security risk).    |     ✅      |         |

## Autofixing

Run ESLint with `--fix` to apply automatic fixes:

```bash
npx eslint . --fix
```

- **`no-useless-ternary`** rewrites `cond ? true : false` → `cond` and `cond ? false : true` → `!cond`.
- **`require-default-in-switch`** offers an editor suggestion to insert a `default` case (suggestions are applied manually from your editor, not by `--fix`).

The remaining rules report problems without auto-rewriting, since the safe fix depends on intent.

## Contributing

Issues and pull requests are welcome at the [GitHub repository](https://github.com/andreasnicolaou/eslint-plugin-conditional-best-practices).

## License

[MIT](LICENSE) © Andreas Nicolaou
