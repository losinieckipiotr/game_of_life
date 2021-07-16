import { p, renderer } from "./types"

import { Controls } from "../Controls";
import { Board } from "../Board";

export function setup(p: p, renderers: renderer[]) {
  return () => {
    renderers.push(Board(p));
    renderers.push(Controls(p));
  };
}
