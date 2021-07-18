import { expect } from '@open-wc/testing'
import { spy } from 'sinon'

import { MySquare } from './MySquare'

describe('MySquare tests', () => {
  it('should call p5 methods with valid args', () => {
    const pMock = {
      fill: spy(),
      rect: spy()
    }
    const { fill, rect } = pMock
    const fakeColorObj = {}

    const renderer = MySquare({
      fill,
      rect
    }, {
      size: 10,
      color: fakeColorObj
    })
    renderer(0, 0)

    expect(fill).to.have.been.calledOnce
    expect(fill).to.have.been.calledOnceWith(fakeColorObj)
    expect(rect).to.have.been.calledOnceWith(0, 0, 10, 10)
  })
})
