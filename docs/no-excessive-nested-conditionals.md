# no-excessive-nested-conditionals


## Description

This rule disallows excessive nesting of conditionals in order to improve code readability.

## Options

```json
{
  "rules": {
    "@andreasnicolaou/conditional-best-practices/no-excessive-nested-conditionals": ["warn", { "max": 2 }]
  }
}
```

- max (optional): The maximum depth of nested conditionals. The default value is 3.

## Severity
- Type: Suggestion
- Recommended: Yes

## Examples

### **Invalid** 👎

```js
if (a) { 
    if (b) { 
        if (c) { 
            if (d) { doSomething(); } 
        } 
    } 
} else if (b) {} else if (c) {} else if (d) {};
```

```js
if (a) { 
    if (a) { 
        if (b) { 
            if (c) { 
                if (d) { doSomething(); } 
            } 
        } 
    } 
} else if (b) {} else if (c) {} else if (d) {};
```

### **Valid** 👍

```js
if (a) { if (b) { if (c) { doSomething(); } } }
```

```js
if (a) {} else if (b) {} else if (c) {} else if (d) {}
```