import { autorun } from "mobx";
import { store } from "./Store";

export function Controls(p) {
  const messagesParagraph = p.createP();
  messagesParagraph.addClass("messages-paragraph");

  const iterationSpan = p.createSpan();
  iterationSpan.addClass("msg");
  iterationSpan.parent(messagesParagraph);

  const simulationRateSpan = p.createSpan();
  simulationRateSpan.addClass("msg");
  simulationRateSpan.parent(messagesParagraph);

  autorun(() => {
    iterationSpan.html(`Iteration: ${store.iteration}`);
  });

  autorun(() => {
    simulationRateSpan.html(`Simulation rate: ${store.simulationRate}`);
  });

  return () => {};
}