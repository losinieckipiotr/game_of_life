import { expect } from '@open-wc/testing'
import { spy } from 'sinon'
import { draw } from './draw'

describe('draw', () => {
  it('should return render function', () => {
    const p5Stub = {}
    const renderer1 = spy()
    const renderer2 = spy()
    const renderers = [renderer1, renderer2]

    const render = draw(p5Stub, { renderers, store: null })
    expect(render).to.be.a('function')

    render()

    expect(renderer1).to.have.been.calledOnce
    expect(renderer2).to.have.been.calledOnce

    render()

    expect(renderer1).to.have.been.calledTwice
    expect(renderer2).to.have.been.calledTwice
  })
})
