import { expect } from '@open-wc/testing'
import { spy, stub } from 'sinon'
import { Controls } from './Controls'
import { Store } from '../../../Store'

// mocked modules
import { autorun } from 'mobx'

describe('Controls renderer', () => {
  it('Should create one controls and setup theirs rendering', () => {
    const spanMock = () => ({
      addClass: () => {},
      parent: () => {},
      html: spy()
    })
    const firstSpan = spanMock()
    const secondSpan = spanMock()
    const pMock = {
      createP: spy(
        () => ({
          addClass: () => {},
          parent: () => {}
        })
      ),
      createSpan: spy(
        stub()
          .onCall(0).returns(firstSpan)
          .onCall(1).returns(secondSpan)
      )
    }
    const store = new Store()
    Controls(pMock, { store })

    expect(pMock.createP).to.have.been.calledOnce
    expect(pMock.createSpan).to.have.been.calledTwice

    expect(autorun).to.have.been.calledTwice

    const [iterationSpanRenderer] = autorun.getCall(0).args
    const [simulationRateSpanRenderer] = autorun.getCall(1).args

    iterationSpanRenderer()

    expect(firstSpan.html)
      .to.have.been.calledOnceWith(`Iteration: ${store.iteration}`)

    simulationRateSpanRenderer()

    expect(secondSpan.html)
      .to.have.been.calledOnceWith(`Simulation rate: ${store.simulationRate}`)
  })
})
