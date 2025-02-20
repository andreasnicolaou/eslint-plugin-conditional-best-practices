# require-default-in-switch

## Description

This rule ensures that switch statements include a default case and/or its not empty.

## Options

This rule does not accept any options.

## Severity

- Type: Suggestion
- Recommended: Yes

## Examples

### **Invalid** 👎

```js
switch (x) {
    case 1:
        break;
    case 2:
        break;
}
```

```js
switch (x) {
    case 1:
        break;
    case 2:
        break;
    default:
}
```

### **Valid** 👍

```js
switch (x) {
    case 1:
        break;
    default:
        break;
}
```
