class p5 {
  setup = () => {}
  draw = () => {}

  constructor(sketch, node) {
    // should set setup and draw callbacks
    sketch(this)

    this.node = node
    this.setup()
    this.draw()
  }
}

export default p5
