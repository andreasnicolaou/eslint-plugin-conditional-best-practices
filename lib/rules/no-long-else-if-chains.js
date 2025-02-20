/**
 * @fileoverview Limit the number of consecutive else-if statements.
 * @author Andreas Nicolaou
 */
'use strict';
const utils = require('@typescript-eslint/utils');
module.exports = {
    create: (context) => ({
        IfStatement(node) {
            const options = context.options[0] || {};
            const max = options.max ?? 3;
            const checkElseIfDepth = (node) => {
                let count = 0;
                let current = node;
                // Traverse the `if-else if` chain and count the else-if statements
                while (current.alternate && current.alternate.type === utils.AST_NODE_TYPES.IfStatement) {
                    count++;
                    if (count > max) {
                        // Report error only for the violating `else-if`
                        context.report({
                            node: current.alternate,
                            messageId: 'maxElseIf',
                            data: { max },
                        });
                        return;
                    }
                    current = current.alternate;
                }
            };
            checkElseIfDepth(node);
        },
    }),
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Limit the number of consecutive else-if statements.',
            recommended: true,
        },
        messages: {
            maxElseIf: 'Avoid using more than {{max}} consecutive else-if statements.',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    max: { type: 'number', minimum: 1, default: 3 },
                },
                additionalProperties: false,
            },
        ],
    },
};
