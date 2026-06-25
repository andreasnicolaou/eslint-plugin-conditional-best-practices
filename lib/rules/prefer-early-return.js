/**
 * @fileoverview This rule encourages the use of early returns instead of deeply nested if-else blocks.
 * @author Andreas Nicolaou
 */
'use strict';
module.exports = {
    create: (context) => ({
        IfStatement(node) {
            if (!node.alternate) return; // Only check when there's an else block
            const alternate = node.alternate;
            // `else return;`
            const isBareReturn = alternate.type === 'ReturnStatement';
            // `else { return; }`
            const isBlockWithReturn =
                alternate.type === 'BlockStatement' &&
                alternate.body.length === 1 &&
                alternate.body[0].type === 'ReturnStatement';
            if (isBareReturn || isBlockWithReturn) {
                context.report({
                    node: alternate,
                    messageId: 'earlyReturn',
                });
            }
        },
    }),
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Prefer early return instead of deep if-else nesting.',
            recommended: true,
            url: 'https://github.com/andreasnicolaou/eslint-plugin-conditional-best-practices/blob/main/docs/prefer-early-return.md',
        },
        messages: {
            earlyReturn: 'Consider using an early return instead of nested if-else.',
        },
        schema: [],
    },
};
