/**
 * @fileoverview Ensure switch statements have a default case.
 * @author Andreas Nicolaou
 */
'use strict';
module.exports = {
    create: (context) => ({
        SwitchStatement(node) {
            const hasDefault = node.cases.some((caseNode) => caseNode.test === null);
            if (!hasDefault) {
                context.report({
                    node,
                    messageId: 'missing',
                    suggest: [
                        {
                            messageId: 'addDefault',
                            fix(fixer) {
                                const closingBrace = context.sourceCode.getLastToken(node);
                                return fixer.insertTextBefore(closingBrace, 'default: break; ');
                            },
                        },
                    ],
                });
                return;
            }
            // Check if the default case is empty
            const defaultCase = node.cases.find((caseNode) => caseNode.test === null);
            if (defaultCase && defaultCase.consequent.length === 0) {
                context.report({
                    node: defaultCase,
                    messageId: 'empty',
                });
            }
        },
    }),
    meta: {
        type: 'suggestion',
        hasSuggestions: true,
        docs: {
            description: 'Ensure switch statements have a default case.',
            recommended: true,
            url: 'https://github.com/andreasnicolaou/eslint-plugin-conditional-best-practices/blob/main/docs/require-default-in-switch.md',
        },
        messages: {
            missing: 'Switch statement should have a default case.',
            empty: 'Default case should not be empty.',
            addDefault: 'Add a default case.',
        },
        schema: [],
    },
};
