# no-useless-ternary


## Description

This rule disallows unnecessary ternary expressions. 

## Options
This rule does not accept any options.

## Severity
- Type: Suggestion
- Recommended: Yes

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
const isEnabled = condition1 ? "yes" : "no";
```