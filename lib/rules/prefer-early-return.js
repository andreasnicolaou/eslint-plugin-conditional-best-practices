/**
 * @fileoverview This rule encourages the use of early returns instead of deeply nested if-else blocks.
 * @author Andreas Nicolaou
 */
'use strict';
const utils = require('@typescript-eslint/utils');
module.exports = {
  create: (context) => ({
    IfStatement(node) {
      if (!node.alternate) return; // Only check when there's an else block
      if (
        node.alternate.type === utils.AST_NODE_TYPES.BlockStatement &&
        node.alternate.body.length === 1 &&
        node.alternate.body[0].type === utils.AST_NODE_TYPES.ReturnStatement
      ) {
        context.report({
          node: node.alternate,
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
    },
    messages: {
      earlyReturn: 'Consider using an early return instead of nested if-else.',
    },
    schema: [],
  },
};
