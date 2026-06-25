/**
 * @fileoverview Do not nest ternary operators. Split them into if-else statements or use a separate ternary expression.
 * @author Andreas Nicolaou
 */
'use strict';
module.exports = {
    create: (context) => ({
        ConditionalExpression(node) {
            if (
                (node.consequent && node.consequent.type === 'ConditionalExpression') ||
                (node.alternate && node.alternate.type === 'ConditionalExpression')
            ) {
                context.report({
                    node,
                    messageId: 'nestedTernary',
                });
            }
        },
    }),
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce no nested ternary operators',
            recommended: true,
            url: 'https://github.com/andreasnicolaou/eslint-plugin-conditional-best-practices/blob/main/docs/no-nested-ternary-operators.md',
        },
        messages: {
            nestedTernary:
                'Do not nest ternary operators. Split them into if-else statements or use an independent statement.',
        },
        schema: [],
    },
};
