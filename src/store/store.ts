import { action, computed, makeObservable, observable } from 'mobx'
import { defaultSimulationRate } from '../enums'
import { Renderer } from '../sketch/types'

export class Store {
  // simple props
  firstRender = true
  simulate = false
  renderers: Renderer[] = []

  // observable
  simulationRate = defaultSimulationRate // fps
  iteration = 0
  intervalHandle?: number

  constructor () {
    this.intervalHandle = undefined

    makeObservable(this, {
      simulationRate: observable,
      iteration: observable,
      intervalHandle: observable,

      simulationInterval: computed,

      incrementIteration: action,
      resetIteration: action,
      setIntervalHandle: action,
      setSimulationRate: action
    })
  }

  get simulationInterval (): number {
    const second = 1000
    return Math.floor(second / this.simulationRate)
  }

  setSimulationRate (simulationRate: number): void {
    this.simulationRate = simulationRate
  }

  incrementIteration (): void {
    ++this.iteration
  }

  resetIteration (): void {
    this.iteration = 0
  }

  setIntervalHandle (intervalHandle: number | undefined): void {
    this.intervalHandle = intervalHandle
  }
}
