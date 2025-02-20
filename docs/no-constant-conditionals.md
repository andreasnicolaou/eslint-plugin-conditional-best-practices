# no-constant-conditionals

## Description

This rule disallows conditionals that always evaluate to true or false.

## Options

This rule does not accept any options.

## Severity

- Type: Problem
- Recommended: Yes

## Examples

### **Invalid** 👎

```js
if (true) {
    sayHi();
}
```

```js
if (false) {
    sayHi();
}
```

### **Valid** 👍

```js
const name = 'andreas';
const x = 'hello';
if (x === name) {
    sayHi();
}
```
