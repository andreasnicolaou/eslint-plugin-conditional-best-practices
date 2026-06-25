/**
 * @fileoverview Disallow duplicate conditions in if-else chains.
 * @author Andreas Nicolaou
 */
'use strict';
module.exports = {
    create: (context) => ({
        IfStatement(node) {
            // Only start from the head of a chain; nested `else if` nodes are
            // visited as the `alternate` of their parent below.
            if (node.parent && node.parent.type === 'IfStatement' && node.parent.alternate === node) {
                return;
            }
            const sourceCode = context.sourceCode || context.getSourceCode();
            const seenConditions = new Set();
            const checkConditions = (statement) => {
                if (statement.test) {
                    const text = sourceCode.getText(statement.test);
                    if (seenConditions.has(text)) {
                        context.report({
                            node: statement.test,
                            messageId: 'duplicate',
                        });
                    } else {
                        seenConditions.add(text);
                    }
                }
                if (statement.alternate && statement.alternate.type === 'IfStatement') {
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
            url: 'https://github.com/andreasnicolaou/eslint-plugin-conditional-best-practices/blob/main/docs/no-duplicated-conditions.md',
        },
        messages: {
            duplicate: 'This condition is repeated in the if-else chain.',
        },
        schema: [],
    },
};
