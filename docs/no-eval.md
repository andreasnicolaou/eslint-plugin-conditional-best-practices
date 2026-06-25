# no-eval

## Description

Disallow use of `eval()` and the `Function` constructor due to security and performance risks. Both can execute arbitrary strings as code, which opens the door to injection attacks and prevents engine optimization.

The rule detects:

- Direct calls: `eval(...)`
- Indirect/aliased eval: `const run = eval;`
- Global access: `window.eval(...)`, `globalThis['eval'](...)`, `self.eval`, `global.eval`
- The implied eval of `new Function(...)`

It does **not** flag identifiers or strings that merely contain the substring `eval` (for example `"retrieval"`, `evaluate()`, or `obj.eval` on a non-global object).

## Options

This rule does not accept any options.

## Severity

- Type: Problem
- Recommended: Yes

## Examples

### **Invalid** 👎

```js
eval('console.log("Hi")');
```

```js
window['eval']('1 + 1');
```

```js
globalThis.eval('1 + 1');
```

```js
const exec = eval;
exec('alert(1)');
```

```js
const fn = new Function('return 1');
```

### **Valid** 👍

```js
const url = 'https://example.com/retrieval';
const word = 'medieval';
function evaluate() {}
const handler = obj.eval; // `obj` is not a global object
```
