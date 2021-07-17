import p5 from "p5"

import { renderer } from "./types"

import { setup } from "./setup";
import { draw } from "./draw";

const sketch = function (p: p5) {
  const renderers: renderer[] = [];

  p.setup = setup(p, renderers);
  p.draw = draw(p, renderers);
};

const appNode = document.querySelector("#skechtContainer") as HTMLDivElement;
new p5(sketch, appNode);
