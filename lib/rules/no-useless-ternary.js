/**
 * @fileoverview Disallow unnecessary ternary expressions.
 * @author Andreas Nicolaou
 */
'use strict';

// Expression types that are tight enough in precedence to safely negate
// with a leading `!` without needing wrapping parentheses.
const SIMPLE_FOR_NEGATION = new Set(['Identifier', 'MemberExpression', 'CallExpression', 'Literal', 'UnaryExpression']);

module.exports = {
    create: (context) => ({
        ConditionalExpression(node) {
            const { test, consequent, alternate } = node;
            // Check if both consequent and alternate are boolean literals (true/false)
            if (
                consequent.type === 'Literal' &&
                alternate.type === 'Literal' &&
                typeof consequent.value === 'boolean' &&
                typeof alternate.value === 'boolean' &&
                consequent.value === !alternate.value
            ) {
                const sourceCode = context.sourceCode;
                context.report({
                    node,
                    messageId: 'uselessTernary',
                    fix(fixer) {
                        const testText = sourceCode.getText(test);
                        // `cond ? true : false` -> `cond`
                        if (consequent.value === true) {
                            return fixer.replaceText(node, testText);
                        }
                        // `cond ? false : true` -> `!cond`
                        const negated = SIMPLE_FOR_NEGATION.has(test.type) ? `!${testText}` : `!(${testText})`;
                        return fixer.replaceText(node, negated);
                    },
                });
            }
        },
    }),
    meta: {
        type: 'suggestion',
        fixable: 'code',
        docs: {
            description: 'Disallow unnecessary ternary expressions.',
            recommended: true,
            url: 'https://github.com/andreasnicolaou/eslint-plugin-conditional-best-practices/blob/main/docs/no-useless-ternary.md',
        },
        messages: {
            uselessTernary: 'This ternary is unnecessary; consider simplifying it.',
        },
        schema: [],
    },
};
