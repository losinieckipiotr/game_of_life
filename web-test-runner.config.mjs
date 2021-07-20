import { esbuildPlugin } from '@web/dev-server-esbuild'
import { importMapsPlugin } from '@web/dev-server-import-maps'

export default {
  files: 'src/**/*.test.js',
  concurrency: 8,
  nodeResolve: true,
  coverage: true,
  coverageConfig: {
    exclude: ['node_modules/**', 'mocks/**']
  },
  plugins: [
    esbuildPlugin({ ts: true, target: 'auto' }),
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            mobx: './mocks/mobx.js',
            p5: './mocks/p5.js'
          }
        }
      }
    })
  ]
}
