import { esbuildPlugin } from '@web/dev-server-esbuild'
import { importMapsPlugin } from '@web/dev-server-import-maps'

export default {
  files: 'src/**/*.test.js',
  concurrency: 10,
  nodeResolve: true,
  coverage: true,
  plugins: [
    esbuildPlugin({ ts: true, target: 'auto' }),
    importMapsPlugin({
      inject: {
        importMap: {
          imports: { mobx: './mocks/mobx.js' }
        }
      }
    })
  ]
}
