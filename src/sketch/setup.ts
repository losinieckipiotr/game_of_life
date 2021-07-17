import { p, Renderer } from "./types"

import { Controls } from "../renderers/Controls"
import { Board } from "../renderers/Board"

export function setup(p: p, renderers: Renderer[]): () => void {
  return () => {
    renderers.push(Board(p))
    renderers.push(Controls(p))
  }
}
