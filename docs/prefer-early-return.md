# prefer-early-return

## Description

This rule encourages the use of early returns instead of deeply nested if-else blocks. It flags an `else` branch whose only statement is a `return`, whether written as a block (`else { return; }`) or inline (`else return;`).

## Options

This rule does not accept any options.

## Severity

- Type: Problem
- Recommended: Yes

## Examples

### **Invalid** 👎

```js
function check(x) {
    if (x) {
        helloWorld();
    } else {
        return;
    }
}
```

```js
function check(x) {
    if (x) helloWorld();
    else return;
}
```

### **Valid** 👍

```js
function check(x) {
    if (!x) return;
    helloWorld();
}
```
