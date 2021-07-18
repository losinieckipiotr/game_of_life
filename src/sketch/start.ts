import { p, Renderer, SetupRendererI } from './types'
import { Store } from '../Store'

export const start = (setup: SetupRendererI, draw: SetupRendererI) => {
  return (p: p): void => {
    const renderers: Renderer[] = []
    const store = new Store()

    p.setup = setup(p, { renderers, store })
    p.draw = draw(p, { renderers, store })
  }
}
