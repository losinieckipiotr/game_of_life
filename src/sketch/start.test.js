import { expect } from '@open-wc/testing'
import { stub } from 'sinon'

import { start } from './start'

describe('start', () => {
  it('should return function that setups p5', () => {
    const setupStub = {}
    const drawStub = {}
    const p5Stub = {}

    const setup = stub().returns(setupStub)
    const draw = stub().returns(drawStub)

    const sketch = start(setup, draw)

    sketch(p5Stub)

    expect(setup).to.have.been.calledOnce
    expect(setup.getCall(0).args[0]).to.be.equal(p5Stub)
    expect(p5Stub.setup).to.be.equal(setupStub)

    expect(draw).to.have.been.calledOnce
    expect(draw.getCall(0).args[0]).to.be.equal(p5Stub)
    expect(p5Stub.draw).to.be.equal(drawStub)
  })
})
