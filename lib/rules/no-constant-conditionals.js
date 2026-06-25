/**
 * @fileoverview Disallow conditionals that always evaluate to true or false.
 * @author Andreas Nicolaou
 */
'use strict';
module.exports = {
    create: (context) => ({
        IfStatement(node) {
            if (
                node.test.type === 'Literal' ||
                (node.test.type === 'UnaryExpression' && node.test.argument.type === 'Literal')
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
            url: 'https://github.com/andreasnicolaou/eslint-plugin-conditional-best-practices/blob/main/docs/no-constant-conditionals.md',
        },
        messages: {
            constant: 'Avoid using constant conditions in if statements.',
        },
        schema: [],
    },
};
