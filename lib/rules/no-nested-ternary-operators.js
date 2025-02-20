/**
 * @fileoverview Do not nest ternary operators. Split them into if-else statements or use a separate ternary expression.
 * @author Andreas Nicolaou
 */
'use strict';
const utils = require('@typescript-eslint/utils');
module.exports = {
    create: (context) => ({
        ConditionalExpression(node) {
            if (
                (node.consequent && node.consequent.type === utils.AST_NODE_TYPES.ConditionalExpression) ||
                (node.alternate && node.alternate.type === utils.AST_NODE_TYPES.ConditionalExpression)
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
        },
        messages: {
            nestedTernary:
                'Do not nest ternary operators. Split them into if-else statements or use an independent statement.',
        },
        schema: [],
    },
};
