# no-duplicated-conditions

## Description

This rule disallows duplicate conditions in `if`/`else if` chains. A repeated condition is always dead code: the second branch can never run, which usually signals a copy-paste mistake.

It compares the full source text of each condition, so it catches more than bare identifiers — for example `if (a > b) {} else if (a > b) {}` is reported too.

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

```js
if (a > b) {
} else if (a > b) {
}
```

### **Valid** 👍

```js
if (a) {
} else if (b) {
}
```

```js
if (a > b) {
} else if (a < b) {
}
```
