import { autorun, reaction } from 'mobx'

import { p, Renderer } from '../../types'
import { Store } from '../../../Store'
import { Cell } from './structs/Cell'
import { CellList } from './structs/CellList'
import {
  boardSize,
  frameRate,
  screenSize,
  squareSize
} from '../../../enums'
import { constrain } from './helpers'
import { MySquare } from '../MySquare'

interface BoardParams {
  store: Store
}

export function Board (p: p, { store }: BoardParams): Renderer {
  p.frameRate(frameRate)

  // const screenSize = [p.windowWidth, p.windowHeight];
  p.createCanvas(...screenSize)

  p.createP()
  const toggleButton = p.createButton('')
  const resetButton = p.createButton('Reset')
  const simRateSlider = p.createSlider(1, 60, store.simulationRate, 1)

  const renderBlackSquare = MySquare(p, {
    size: squareSize,
    color: p.color(64, 64, 64)
  })
  const renderWhiteSquare = MySquare(p, {
    size: squareSize,
    color: p.color(224, 224, 224)
  })

  const renderCell = (cell: Cell) => {
    const { alive, x, y } = cell
    if (alive) {
      renderWhiteSquare(x, y) // side effect
    } else {
      renderBlackSquare(x, y) // side effect
    }
  }

  let currentCells = new CellList({ boardSize, squareSize })
  let nextCells: CellList = currentCells.clone()

  const renderAllCells = () => {
    currentCells.forEach((cell) => {
      renderCell(cell)
    })
  }

  const gameOfLifeSimulation = () => {
    nextCells = currentCells.clone() // mutation

    currentCells.forEach((cell) => {
      const { i, j } = cell

      const futureCell = nextCells.getCell(i, j)
      const aliveNeighbours = currentCells.getAliveNeighbours(i, j)
      if (cell.alive) {
        if (aliveNeighbours < 2 || aliveNeighbours > 3) {
          futureCell.alive = false // mutation
          renderCell(futureCell)
        }
      } else if (aliveNeighbours === 3) {
        futureCell.alive = true // mutation
        renderCell(futureCell)
      }
    })

    currentCells = nextCells // mutation
    // desctruction :)
    // store.nextCells = null;
  }

  const renderSingleSquare = (cell: Cell, renderAlive: boolean) => {
    if (renderAlive !== cell.alive) {
      cell.alive = renderAlive // mutation
      renderCell(cell)
    }
  }

  const onMousePressed = () => {
    const minMax: [number, number] = [0, boardSize - 1]
    const i = constrain(
      Math.floor(p.mouseX / squareSize),
      minMax
    )
    const j = constrain(
      Math.floor(p.mouseY / squareSize),
      minMax
    )

    if (isNaN(i) || isNaN(j)) {
      return
    }

    const cell = currentCells.getCell(i, j)
    if (p.mouseButton === p.LEFT) {
      renderSingleSquare(cell, true)
    } else if (p.mouseButton === p.RIGHT) {
      renderSingleSquare(cell, false)
    }
  }

  p.mousePressed = onMousePressed
  p.mouseDragged = onMousePressed

  const setupNextSimulation = () => {
    store.simulate = true
  }

  const startInterval = () => {
    // simulationLoop();
    // side effect
    store.setIntervalHandle(
      window.setInterval(setupNextSimulation, store.simulationInterval)
    )
  }

  const stopInterval = () => {
    clearInterval(store.intervalHandle) // side effect
    store.setIntervalHandle(undefined)
  }

  const toggleSimulation = () => {
    if (store.intervalHandle === undefined) {
      startInterval()
    } else {
      stopInterval()
    }
  }

  const reseSimulation = () => {
    stopInterval()
    currentCells.forEach((cell) => {
      cell.alive = false
      renderCell(cell)
    })
    store.resetIteration()
  }

  toggleButton.mouseClicked(toggleSimulation)
  resetButton.mouseClicked(reseSimulation)
  p.keyPressed = () => {
    if (p.keyCode === p.ENTER) {
      toggleSimulation()
    }
  }

  reaction(
    () => store.simulationRate,
    () => {
      if (store.intervalHandle) {
        stopInterval()
        startInterval()
      }
    }
  )

  autorun(() => {
    if (store.intervalHandle) {
      toggleButton.html('Stop simulation')
    } else {
      toggleButton.html('Start simulation')
    }
  })

  return () => {
    if (p.mouseIsPressed) {
      onMousePressed()
    }

    if (store.simulate) {
      gameOfLifeSimulation()
      store.incrementIteration()
      store.simulate = false
    }

    if (store.firstRender) {
      renderAllCells()
      store.firstRender = false
    }

    store.simulationRate = Number(simRateSlider.value())
  }
}
