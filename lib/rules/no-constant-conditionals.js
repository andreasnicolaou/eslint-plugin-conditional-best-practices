/**
 * @fileoverview Disallow conditionals that always evaluate to true or false.
 * @author Andreas Nicolaou
 */
'use strict';
const utils = require('@typescript-eslint/utils');
module.exports = {
    create: (context) => ({
        IfStatement(node) {
            if (
                node.test.type === utils.AST_NODE_TYPES.Literal ||
                (node.test.type === utils.AST_NODE_TYPES.UnaryExpression &&
                    node.test.argument.type === utils.AST_NODE_TYPES.Literal)
            ) {
                context.report({
                    node: node.test,
                    messageId: 'constant',
                });
            }
        },
    }),
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow conditionals that always evaluate to true or false.',
            recommended: true,
        },
        messages: {
            constant: 'Avoid using constant conditions in if statements.',
        },
        schema: [],
    },
};
