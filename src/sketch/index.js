import p5 from "p5";

import { setup } from "./setup";
import { draw } from "./draw";

const sketch = function (p) {
  const renderers = [];

  p.setup = setup(p, renderers);
  p.draw = draw(p, renderers);
};

const appNode = document.querySelector("#skechtContainer");
new p5(sketch, appNode);
