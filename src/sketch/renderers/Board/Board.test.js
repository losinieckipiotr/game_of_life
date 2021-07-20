import { expect } from '@open-wc/testing'
import { spy, stub } from 'sinon'

import { Store } from '../../../Store'
import { Board } from './Board'

import { defaultSimulationRate } from '../../../enums'

// mocked modules
// import { autorun } from 'mobx'

describe('Board', () => {
  // beforeEach(() => {
  // })

  it('should setup board', () => {
    const fakeToggleButtonElement = {
      name: 'toggle button',
      mouseClicked: spy(),
      html: spy()
    }
    const fakeResetButtonElement = {
      name: 'reset button',
      mouseClicked: spy()
    }
    const fakeSlider = {
      name: 'slider',
      value: () => '30'
    }

    const pMock = {
      frameRate: spy(),
      createCanvas: spy(),
      createP: spy(),
      createButton: stub(),
      createSlider: stub(),
      color: spy(),
      mouseX: 0,
      mouseY: 0,
      LEFT: 'left',
      RIGHT: 'right',
      mouseButton: undefined,
      mousePressed: undefined,
      mouseDragged: undefined,
      keyPressed: undefined,
      keyCode: undefined,
      ENTER: 'enter',
      mouseIsPressed: false
    }

    pMock.createButton.onFirstCall().returns(fakeToggleButtonElement)
    pMock.createButton.onSecondCall().returns(fakeResetButtonElement)
    pMock.createSlider.onFirstCall().returns(fakeSlider)

    const store = new Store()
    const renderBoard = Board(pMock, { store })

    expect(renderBoard).to.be.a('function')
    expect(pMock.createButton.getCall(0).args[0]).to.equal('')
    expect(pMock.createButton.getCall(1).args[0]).to.equal('Reset')

    expect(
      pMock.createSlider.getCall(0)
        .calledWith(1, 60, defaultSimulationRate, 1)
    ).to.be.true
  })
})
