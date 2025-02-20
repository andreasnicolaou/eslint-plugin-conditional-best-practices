/**
 * @fileoverview Disallow use of eval() due to security risks.
 * @author Andreas Nicolaou
 */
'use strict';
const utils = require('@typescript-eslint/utils');
module.exports = {
    create: (context) => ({
        Literal(node) {
            if (typeof node.value === 'string' && node.value.includes('eval')) {
                context.report({
                    node,
                    messageId: 'noEval',
                });
            }
        },
        CallExpression(node) {
            if (node.callee.type === utils.AST_NODE_TYPES.Identifier && node.callee.name === 'eval') {
                context.report({
                    node,
                    messageId: 'noEval',
                });
            }
        },
        VariableDeclarator(node) {
            if (node.init && node.init.type === utils.AST_NODE_TYPES.Identifier && node.init.name === 'eval') {
                context.report({
                    node,
                    messageId: 'noEval',
                });
            }
        },
        MemberExpression(node) {
            if (
                node.object.type === utils.AST_NODE_TYPES.Identifier &&
                ['window', 'globalThis'].includes(node.object.name) &&
                node.property.type === utils.AST_NODE_TYPES.Identifier &&
                node.property.name === 'eval'
            ) {
                context.report({
                    node,
                    messageId: 'noEval',
                });
            }
        },
    }),
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow use of eval() due to security risks',
            recommended: true,
        },
        messages: {
            noEval: 'Using eval() is a security risk and should be avoided.',
        },
        schema: [],
    },
};
