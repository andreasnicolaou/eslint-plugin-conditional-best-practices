# no-duplicated-conditions

## Description

This rule disallows duplicate conditions in if-else chains.

## Options

This rule does not accept any options.

## Severity

- Type: Problem
- Recommended: Yes

## Examples

### **Invalid** 👎

```js
if (a) {
} else if (a) {
}
```

### **Valid** 👍

```js
if (a) {
} else if (b) {
}
```
