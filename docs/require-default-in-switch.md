# require-default-in-switch

## Description

This rule ensures that `switch` statements include a `default` case and that the `default` case is not empty.

When the `default` case is missing, the rule offers an editor **suggestion** to insert one (`default: break;`). Suggestions are applied manually from your editor and are not run by `eslint --fix`.

## Options

This rule does not accept any options.

## Severity

- Type: Suggestion
- Recommended: Yes
- Has suggestions: Yes

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
