# prefer-early-return

## Description

This rule encourages the use of early returns instead of deeply nested if-else blocks.

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

### **Valid** 👍

```js
function check(x) {
    if (!x) return;
    helloWorld();
}
```
