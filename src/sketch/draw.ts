import { p, SetupRendererI } from './types'

export const draw: SetupRendererI = (p: p, { renderers }) => {
  return (): void => {
    renderers.forEach((render) => {
      render()
    })
  }
}
