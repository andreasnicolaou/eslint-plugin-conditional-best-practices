# no-long-else-if-chains


## Description

This rule limits the number of consecutive else-if statements.

## Options

```json
{
  "rules": {
    "@andreasnicolaou/conditional-best-practices/no-long-else-if-chains": 
    ["warn", { "max": 2 }]
  }
}
```

- max (optional): The maximum number of consecutive else-if statements. The default value is 3.

## Severity
- Type: Suggestion
- Recommended: Yes

## Examples

### **Invalid** 👎

```js
if (a) {}
else if (b) {}
else if (c) {}
else if (d) {}
else if (e) {} 
```

```js
if (a) {} 
else if (b) {} 
else if (c) {} 
else if (d) {} 
else if (e) {}
else if (f) {}
```

### **Valid** 👍

```js
if (a) {}
```

```js
if (a) {} else if (b) {}
```

```js
if (a) {} else if (b) {} else if (c) {}
```