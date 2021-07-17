import { expect } from '@open-wc/testing'
import { spy } from 'sinon'

import { MySquare } from './MySquare'

const pMock = {
  fill: spy(),
  rect: spy()
}

describe('MySquare tests', () => {
  beforeEach(() => {
    pMock.fill.resetHistory()
    pMock.rect.resetHistory()
  })

  it('should render square', () => {
    const {
      fill,
      rect
    } = pMock
    const fakeColorObj = {}
    const renderer = MySquare(pMock, { size: 10, color: fakeColorObj })

    renderer(0, 0)

    expect(fill).to.have.been.calledOnce
    expect(fill.getCall(0).args[0]).to.be.equal(fakeColorObj)
    expect(rect).to.have.been.calledOnce
  })
})
