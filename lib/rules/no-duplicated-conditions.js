/**
 * @fileoverview Disallow duplicate conditions in if-else chains.
 * @author Andreas Nicolaou
 */
'use strict';
const utils = require('@typescript-eslint/utils');
module.exports = {
    create: (context) => ({
        IfStatement(node) {
            const seenConditions = new Set([]);
            const checkConditions = (statement) => {
                if (statement.test) {
                    if (
                        statement.test.type === utils.AST_NODE_TYPES.Identifier ||
                        statement.test.type === utils.AST_NODE_TYPES.Literal
                    ) {
                        const sourceCode = context.sourceCode.getText(statement.test);
                        if (seenConditions.has(sourceCode)) {
                            context.report({
                                node: statement.test,
                                messageId: 'duplicate',
                            });
                        } else {
                            seenConditions.add(sourceCode);
                        }
                    }
                }
                if (statement.alternate && statement.alternate.type === utils.AST_NODE_TYPES.IfStatement) {
                    checkConditions(statement.alternate);
                }
            };
            checkConditions(node);
        },
    }),
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow duplicate conditions in if-else chains.',
            recommended: true,
        },
        messages: {
            duplicate: 'This condition is repeated in the if-else chain.',
        },
        schema: [],
    },
};
