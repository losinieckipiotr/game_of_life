import { autorun } from 'mobx'
import { Store } from '../../store'
import { p, Renderer } from '../../sketch/types'

interface ControlsParams {
  store: Store
}

export function Controls (p: p, { store }: ControlsParams): Renderer {
  const messagesParagraph = p.createP()
  messagesParagraph.addClass('messages-paragraph')

  const iterationSpan = p.createSpan()
  iterationSpan.addClass('msg')
  iterationSpan.parent(messagesParagraph)

  const simulationRateSpan = p.createSpan()
  simulationRateSpan.addClass('msg')
  simulationRateSpan.parent(messagesParagraph)

  autorun(() => {
    iterationSpan.html(`Iteration: ${store.iteration}`)
  })

  autorun(() => {
    simulationRateSpan.html(`Simulation rate: ${store.simulationRate}`)
  })

  return () => {}
}
