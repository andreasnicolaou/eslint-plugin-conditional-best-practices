# no-eval

## Description

Disallow use of eval() due to security risks.

## Options

This rule does not accept any options.

## Severity

- Type: Problem
- Recommended: Yes

## Examples

### **Invalid** 👎

```js
eval(console.log('Hi'));
```

```js
window['eval'](console.log('Not Allowed'));
```

```js
globalThis['eval'](console.log('Not Allowed'));
```

```js
const exec = eval;
exec(console.log('Not Allowed'));
```

```js
const safeEval = eval;
safeEval(console.log('Not Allowed'));
```
