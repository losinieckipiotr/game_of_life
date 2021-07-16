import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: "src/*.test.js",
  concurrency: 10,
  nodeResolve: true,
  coverage: true,
  plugins: [esbuildPlugin({ ts: true, target: 'auto' })],
};
