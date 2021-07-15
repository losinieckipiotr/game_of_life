import { makeObservable, observable, computed, action } from "mobx";

class Store {
  constructor() {
    // simple props
    this.firstRender = true;
    this.simulate = false;
    this.currentCells = null;
    this.nextCells = null;

    // observable
    this.simulationRate = 15; // fps
    this.iteration = 0;
    this.intervalHandle = undefined;

    makeObservable(this, {
      simulationRate: observable,
      iteration: observable,
      intervalHandle: observable,

      simulationInterval: computed,

      updateSimulationRate: action,
      incrementIteration: action,
      resetIteration: action,
      setupIntervalHandle: action
    });
  }

  get simulationInterval() {
    return Math.floor(1000 / this.simulationRate); // ms
  }

  updateSimulationRate(simulationRate) {
    this.simulationRate = simulationRate;
  }

  incrementIteration() {
    ++this.iteration;
  }

  resetIteration() {
    this.iteration = 0;
  }

  setupIntervalHandle(intervalHandle) {
    this.intervalHandle = intervalHandle;
  }
}

export const store = new Store();
