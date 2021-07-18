import { p, Renderer, SetupRendererI } from './types'

export const draw: SetupRendererI = (p: p, renderers: Renderer[]) => {
  return (): void => {
    renderers.forEach((render) => {
      render()
    })
  }
}
