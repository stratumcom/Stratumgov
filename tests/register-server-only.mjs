import { createRequire } from "node:module";
// Test-only stub for Node's CommonJS module cache. Production is unchanged.
const require = createRequire(import.meta.url);
const id = require.resolve("server-only");
require.cache[id] = { id, filename: id, loaded: true, exports: {} };
