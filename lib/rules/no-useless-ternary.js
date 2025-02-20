/**
 * @fileoverview Disallow unnecessary ternary expressions.
 * @author Andreas Nicolaou
 */
'use strict';
const utils = require('@typescript-eslint/utils');
module.exports = {
    create: (context) => ({
        ConditionalExpression(node) {
            const { consequent, alternate } = node;
            // Check if both consequent and alternate are literals (true/false)
            if (
                consequent.type === utils.AST_NODE_TYPES.Literal &&
                alternate.type === utils.AST_NODE_TYPES.Literal &&
                typeof consequent.value === 'boolean' &&
                typeof alternate.value === 'boolean' &&
                consequent.value === !alternate.value
            ) {
                context.report({
                    node,
                    messageId: 'uselessTernary',
                });
            }
        },
    }),
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Disallow unnecessary ternary expressions.',
            recommended: true,
        },
        messages: {
            uselessTernary: 'This ternary is unnecessary; consider simplifying it.',
        },
        schema: [],
    },
};
