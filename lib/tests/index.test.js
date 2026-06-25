const assert = require('assert');
const plugin = require(`${process.cwd()}/index`);

describe('plugin index', () => {
    it('exposes plugin meta (name and version) for flat config', () => {
        assert.ok(plugin.meta, 'meta should be defined');
        assert.strictEqual(typeof plugin.meta.name, 'string');
        assert.strictEqual(typeof plugin.meta.version, 'string');
    });

    it('exports all rules with valid meta and a create function', () => {
        const ruleNames = Object.keys(plugin.rules);
        assert.ok(ruleNames.length > 0, 'should export at least one rule');
        for (const name of ruleNames) {
            const rule = plugin.rules[name];
            assert.strictEqual(typeof rule.create, 'function', `${name} should have a create function`);
            assert.ok(rule.meta, `${name} should have meta`);
            assert.ok(rule.meta.docs && rule.meta.docs.url, `${name} should have a docs url`);
            assert.ok(rule.meta.messages, `${name} should have messages`);
        }
    });

    it('provides a flat recommended config that registers the plugin', () => {
        const config = plugin.configs.recommended;
        assert.ok(config, 'recommended config should exist');
        assert.ok(config.plugins, 'flat recommended config should declare plugins');
        assert.ok(
            config.plugins['@andreasnicolaou/conditional-best-practices'],
            'recommended config should register the plugin object'
        );
        assert.ok(Object.keys(config.rules).length > 0, 'recommended config should enable rules');
    });

    it('provides a flat "all" config enabling every rule', () => {
        const config = plugin.configs.all;
        assert.ok(config, 'all config should exist');
        assert.strictEqual(
            Object.keys(config.rules).length,
            Object.keys(plugin.rules).length,
            'all config should enable every rule'
        );
    });

    it('provides a legacy-recommended config for eslintrc users', () => {
        const config = plugin.configs['legacy-recommended'];
        assert.ok(config, 'legacy-recommended config should exist');
        assert.ok(Array.isArray(config.plugins), 'legacy config should declare plugins as an array');
    });
});
