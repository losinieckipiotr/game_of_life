import { p, renderer } from "./types"

import { Controls } from "../renderers/Controls";
import { Board } from "../renderers/Board";

export function setup(p: p, renderers: renderer[]) {
  return () => {
    renderers.push(Board(p));
    renderers.push(Controls(p));
  };
}
