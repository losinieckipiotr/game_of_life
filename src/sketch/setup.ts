import { Board } from '../renderers/Board'
import { Controls } from '../renderers/Controls'
import { p, Renderer, SetupRendererI } from './types'

export const setup: SetupRendererI = (p: p, renderers: Renderer[]) => {
  return () => {
    renderers.push(Board(p))
    renderers.push(Controls(p))
  }
}
