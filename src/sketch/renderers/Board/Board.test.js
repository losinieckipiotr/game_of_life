import { expect } from '@open-wc/testing'
import { spy } from 'sinon'

import { getP5 } from '../../../../test/test-helper'

import { Store } from '../../../Store'
import { Board } from './Board'

import { defaultSimulationRate } from '../../../enums'

describe('Board', () => {
  let p
  before(() => {
    p = spy(getP5())
  })

  it('should setup board', () => {
    const store = new Store()
    const renderBoard = Board(p, { store })

    expect(renderBoard).to.be.a('function')

    expect(p.createButton).to.have.been.calledTwice
    expect(p.createSlider).to.have.been.calledOnce

    const toggleButton = document.querySelector('#toggleButton')

    expect(toggleButton).to.be.instanceOf(HTMLButtonElement)
    expect(toggleButton).to.have.trimmed.text('Start simulation')

    const resetButton = document.querySelector('#resetButton')

    expect(resetButton).to.be.instanceOf(HTMLButtonElement)
    expect(resetButton).to.have.trimmed.text('Reset')

    expect(
      p.createSlider.getCall(0)
        .calledWith(1, 60, defaultSimulationRate, 1)
    ).to.be.true

    // TODO
  })
})
