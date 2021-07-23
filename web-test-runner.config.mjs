/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  testRunnerHtml: testFramework =>
    `<html>
      <body>
        <script type="module" src="${testFramework}"></script>
        <div id="sketchContainer"></div>
      </body>
    </html>`,
  plugins: [
    esbuildPlugin({ ts: true, target: 'auto' }),
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            mobx: './mocks/mobx.js'
          }
        }
      }
    })
  ]
}
