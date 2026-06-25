# no-useless-ternary

## Description

This rule disallows unnecessary ternary expressions where both branches are boolean literals, such as `cond ? true : false`.

This rule is **autofixable** with `eslint --fix`:

- `cond ? true : false` → `cond`
- `cond ? false : true` → `!cond`

## Options

This rule does not accept any options.

## Severity

- Type: Suggestion
- Recommended: Yes
- Fixable: Yes (code)

## Examples

### **Invalid** 👎

```js
const isActive = condition2 ? true : false;
```

```js
const isInactive = condition3 ? false : true;
```

### **Valid** 👍

```js
const isEnabled = condition1 ? 'yes' : 'no';
```
