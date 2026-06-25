'use strict';

const rules = require('./lib/rules');
const { name, version } = require('./package.json');

const PLUGIN_NAME = '@andreasnicolaou/conditional-best-practices';

// Severities used by the `recommended` config.
const RECOMMENDED_SEVERITIES = {
    'no-excessive-nested-conditionals': 'warn',
    'no-long-else-if-chains': 'warn',
    'require-default-in-switch': 'warn',
    'no-constant-conditionals': 'error',
    'prefer-early-return': 'warn',
    'no-duplicated-conditions': 'error',
    'no-useless-ternary': 'warn',
    'no-nested-ternary-operators': 'warn',
    'no-eval': 'error',
};

const prefixRules = (severityByRule) =>
    Object.fromEntries(
        Object.entries(severityByRule).map(([ruleName, severity]) => [`${PLUGIN_NAME}/${ruleName}`, severity])
    );

const recommendedRules = prefixRules(RECOMMENDED_SEVERITIES);
const allRules = prefixRules(Object.fromEntries(Object.keys(rules).map((ruleName) => [ruleName, 'error'])));

const plugin = {
    meta: { name, version },
    rules,
    configs: {},
};

// Flat config (ESLint 9+). This is the default and recommended way to consume the plugin.
plugin.configs.recommended = {
    name: `${PLUGIN_NAME}/recommended`,
    plugins: { [PLUGIN_NAME]: plugin },
    rules: recommendedRules,
};

plugin.configs.all = {
    name: `${PLUGIN_NAME}/all`,
    plugins: { [PLUGIN_NAME]: plugin },
    rules: allRules,
};

// Legacy config (.eslintrc / eslintrc-style via FlatCompat) for older setups.
plugin.configs['legacy-recommended'] = {
    plugins: [PLUGIN_NAME],
    rules: recommendedRules,
};

module.exports = plugin;
