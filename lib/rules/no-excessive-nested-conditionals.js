/**
 * @fileoverview Disallow excessive nested conditionals to improve readability
 * @author Andreas Nicolaou
 */
'use strict';
const utils = require('@typescript-eslint/utils');
module.exports = {
  create: (context) => ({
    IfStatement(node) {
      const options = context.options[0] || {};
      const max = options.max ?? 3;
      const checkDepth = (node, depth = 1) => {
        if (depth > max) {
          context.report({
            node,
            messageId: 'deep',
            data: { max },
          });
          return;
        }
        // Check the body inside an if-statement block
        if (node.consequent?.type === utils.AST_NODE_TYPES.BlockStatement) {
          for (const stmt of node.consequent.body) {
            if (stmt.type === utils.AST_NODE_TYPES.IfStatement) {
              checkDepth(stmt, depth + 1);
            }
          }
        } else if (node.consequent?.type === utils.AST_NODE_TYPES.IfStatement) {
          checkDepth(node.consequent, depth + 1);
        }
        // `else if` statements should be at the same depth
        if (node.alternate?.type === utils.AST_NODE_TYPES.IfStatement) {
          checkDepth(node.alternate, depth);
        } else if (node.alternate?.type === utils.AST_NODE_TYPES.BlockStatement) {
          for (const stmt of node.alternate.body) {
            if (stmt.type === utils.AST_NODE_TYPES.IfStatement) {
              checkDepth(stmt, depth + 1);
            }
          }
        }
      };
      checkDepth(node);
    },
  }),
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow excessive nested conditionals to improve readability',
      recommended: true,
    },
    messages: {
      deep: 'Avoid nesting conditionals deeper than {{max}} levels.',
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
