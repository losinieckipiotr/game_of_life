import { Controls } from "../Controls";
import { Board } from "../Board";

export function setup(p, renderers) {
  return () => {
    renderers.push(Board(p));
    renderers.push(Controls(p));
  };
}
