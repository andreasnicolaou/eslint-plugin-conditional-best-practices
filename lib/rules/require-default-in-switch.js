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
        docs: {
            description: 'Ensure switch statements have a default case.',
            recommended: true,
        },
        messages: {
            missing: 'Switch statement should have a default case.',
            empty: 'Default case should not be empty.',
        },
        schema: [],
    },
};
