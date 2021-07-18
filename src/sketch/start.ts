import { p, Renderer, SetupRendererI } from './types'

export const start = (setup: SetupRendererI, draw: SetupRendererI) => {
  return (p: p): void => {
    const renderers: Renderer[] = []

    p.setup = setup(p, renderers)
    p.draw = draw(p, renderers)
  }
}
