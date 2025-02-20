# no-nested-ternary-operators

## Description

This rule disallows nested ternary operators.

## Options

This rule does not accept any options.

## Severity

- Type: Problem
- Recommended: Yes

## Examples

### **Invalid** 👎

```js
const result = condition1 ? 'a' : condition2 ? 'b' : 'c';
```

```js
const result = condition1 ? (condition2 ? 'a' : 'b') : 'c';
```

```js
const result = condition1 ? (condition2 ? 'a' : 'b') : condition3 ? 'x' : 'y';
```

### **Valid** 👍

```js
const result = condition ? 'a' : 'b';
```
