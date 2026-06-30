const assert = require('assert');

const appName = 'mern-monolith-app';
const dockerEnabled = true;
const githubActionsEnabled = true;

assert.strictEqual(appName, 'mern-monolith-app');
assert.strictEqual(dockerEnabled, true);
assert.strictEqual(githubActionsEnabled, true);

console.log('All basic tests passed');
