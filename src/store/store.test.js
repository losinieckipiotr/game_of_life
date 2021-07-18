import { expect } from '@open-wc/testing'
import { Store } from './store'
import { defaultSimulationRate } from '../enums'

// mocked modules
import { makeObservable, observable, computed, action } from 'mobx'

describe('store', () => {
  it('should make observable with valid config', () => {
    const store = new Store()

    expect(store.firstRender).to.be.true
    expect(store.simulationRate).to.be.equal(defaultSimulationRate)
    expect(store.iteration).to.be.equal(0)
    expect(store.intervalHandle).to.be.undefined

    expect(makeObservable).to.have.been.calledOnce

    const makeObservableArgs = makeObservable.getCall(0).args
    const [storeRef, observableConfig] = makeObservableArgs
    expect(storeRef).to.be.equal(store)

    expect(observableConfig.simulationRate).to.be.equal(observable)
    expect(observableConfig.iteration).to.be.equal(observable)
    expect(observableConfig.intervalHandle).to.be.equal(observable)

    expect(observableConfig.simulationInterval).to.be.equal(computed)

    expect(observableConfig.updateSimulationRate).to.be.equal(action)
    expect(observableConfig.incrementIteration).to.be.equal(action)
    expect(observableConfig.resetIteration).to.be.equal(action)
    expect(observableConfig.setupIntervalHandle).to.be.equal(action)
  })

  it('should return simulation interval', () => {
    const store = new Store()

    const { simulationInterval } = store
    const second = 1000
    const expectedSimulationRate = Math.floor(second / defaultSimulationRate)
    expect(simulationInterval).to.be.equal(expectedSimulationRate)
  })
})
