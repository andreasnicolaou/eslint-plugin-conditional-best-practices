/**
 * @fileoverview Disallow use of eval() and the implied eval of `new Function()` due to security risks.
 * @author Andreas Nicolaou
 */
'use strict';

const GLOBAL_OBJECTS = new Set(['window', 'globalThis', 'global', 'self']);

/**
 * Returns true when the member expression references `<global>.eval`,
 * covering both dot (`window.eval`) and computed (`window['eval']`) access.
 * @param {object} node MemberExpression node
 * @returns {boolean}
 */
function isGlobalEvalMember(node) {
    if (node.object.type !== 'Identifier' || !GLOBAL_OBJECTS.has(node.object.name)) {
        return false;
    }
    if (!node.computed && node.property.type === 'Identifier') {
        return node.property.name === 'eval';
    }
    if (node.computed && node.property.type === 'Literal') {
        return node.property.value === 'eval';
    }
    return false;
}

module.exports = {
    create: (context) => ({
        // Direct call: eval('...'), indirect call: (0, eval)('...'),
        // and reflective call: eval.call(null, '...') / eval.apply(...)
        CallExpression(node) {
            const callee = node.callee;
            // eval('...')
            if (callee.type === 'Identifier' && callee.name === 'eval') {
                context.report({ node, messageId: 'noEval' });
                return;
            }
            // eval.call(...) / eval.apply(...)
            if (
                callee.type === 'MemberExpression' &&
                callee.object.type === 'Identifier' &&
                callee.object.name === 'eval' &&
                callee.property.type === 'Identifier' &&
                (callee.property.name === 'call' || callee.property.name === 'apply')
            ) {
                context.report({ node, messageId: 'noEval' });
                return;
            }
            // (0, eval)('...') — the comma operator yields a reference to eval
            if (callee.type === 'SequenceExpression') {
                const last = callee.expressions[callee.expressions.length - 1];
                if (last && last.type === 'Identifier' && last.name === 'eval') {
                    context.report({ node, messageId: 'noEval' });
                }
            }
        },
        // Implied eval: new Function('...')
        NewExpression(node) {
            if (node.callee.type === 'Identifier' && node.callee.name === 'Function') {
                context.report({ node, messageId: 'noFunction' });
            }
        },
        // Indirect eval via aliasing: const run = eval;
        VariableDeclarator(node) {
            if (node.init && node.init.type === 'Identifier' && node.init.name === 'eval') {
                context.report({ node, messageId: 'noEval' });
            }
        },
        // Global access: window.eval / globalThis['eval'] / self.eval ...
        MemberExpression(node) {
            if (isGlobalEvalMember(node)) {
                context.report({ node, messageId: 'noEval' });
            }
        },
    }),
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow use of eval() due to security risks',
            recommended: true,
            url: 'https://github.com/andreasnicolaou/eslint-plugin-conditional-best-practices/blob/main/docs/no-eval.md',
        },
        messages: {
            noEval: 'Using eval() is a security risk and should be avoided.',
            noFunction: 'The Function constructor is eval-like and should be avoided.',
        },
        schema: [],
    },
};
