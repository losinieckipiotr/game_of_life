import { p, renderer } from "./types"



export function draw(p: p, renderers: renderer[]) {
  return () => {
    renderers.forEach((render) => {
      render();
    });
  };
}
