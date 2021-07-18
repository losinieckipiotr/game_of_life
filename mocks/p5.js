/**
 * Note: This mock is not use for now
 */
class p5 {
  setup
  draw

  constructor(sketch, node) {
    // should set setup and draw callbacks
    sketch(this)

    this.node = node
  }
}

import { spy } from 'sinon'

export default spy(p5)
