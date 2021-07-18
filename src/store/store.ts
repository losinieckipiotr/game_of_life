import { action, computed, makeObservable, observable } from 'mobx'
import { defaultSimulationRate } from '../enums'

export class Store {
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

  get simulationInterval (): number {
    const second = 1000
    return Math.floor(second / this.simulationRate)
  }

  updateSimulationRate (simulationRate: number): void {
    this.simulationRate = simulationRate
  }

  incrementIteration (): void {
    ++this.iteration
  }

  resetIteration (): void {
    this.iteration = 0
  }

  setupIntervalHandle (intervalHandle: number | undefined): void {
    this.intervalHandle = intervalHandle
  }
}
