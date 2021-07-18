import { action, computed, makeObservable, observable } from 'mobx'
import { defaultSimulationRate } from '../utils/enums'

class Store {
  // simple props
  firstRender = true;
  simulate = false;

  // observable
  simulationRate = defaultSimulationRate; // fps
  iteration = 0;
  intervalHandle?: number;

  constructor () {
    makeObservable(this, {
      simulationRate: observable,
      iteration: observable,
      intervalHandle: observable,

      simulationInterval: computed,

      updateSimulationRate: action,
      incrementIteration: action,
      resetIteration: action,
      setupIntervalHandle: action
    })
  }

  get simulationInterval () {
    return Math.floor(1000 / this.simulationRate) // ms
  }

  updateSimulationRate (simulationRate: number) {
    this.simulationRate = simulationRate
  }

  incrementIteration () {
    ++this.iteration
  }

  resetIteration () {
    this.iteration = 0
  }

  setupIntervalHandle (intervalHandle: number | undefined) {
    this.intervalHandle = intervalHandle
  }
}

export const store = new Store()
