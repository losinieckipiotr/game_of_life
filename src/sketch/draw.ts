import { p, Renderer } from "./types"

export function draw(p: p, renderers: Renderer[]) {
  return (): void => {
    renderers.forEach((render) => {
      render()
    })
  }
}
