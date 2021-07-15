import { autorun, reaction } from "mobx";

import { MySquare } from "./MySquare";
import { constrain } from "./helpers";
import { screenSize, frameRate, squareSize, boardSize } from "./enums";
import { CellList } from "./CellList2";
import { store } from "./Store";

export function Board(p) {
  p.frameRate(frameRate);

  // const screenSize = [p.windowWidth, p.windowHeight];
  p.createCanvas(...screenSize);

  p.createP();
  const toggleButton = p.createButton();
  const resetButton = p.createButton("Reset");
  const simRateSlider = p.createSlider(1, 30, store.simulationRate, 1);

  const renderBlackSquare = MySquare(p, {
    size: squareSize,
    color: p.color(64, 64, 64)
  });
  const renderWhiteSquare = MySquare(p, {
    size: squareSize,
    color: p.color(224, 224, 224)
  });

  const renderCell = (cell) => {
    const { alive, x, y } = cell;
    if (alive) {
      renderWhiteSquare(x, y); // side effect
    } else {
      renderBlackSquare(x, y); // side effect
    }
  };

  store.currentCells = new CellList({ boardSize, squareSize });
  const renderAllCells = () => {
    store.currentCells.forEach((cell) => {
      renderCell(cell);
    });
  };

  const gameOfLifeSimulation = () => {
    store.nextCells = store.currentCells.clone(); // mutation

    store.currentCells.forEach((cell) => {
      const { i, j } = cell;

      const futureCell = store.nextCells.getCell(i, j);
      const aliveNeighbours = store.currentCells.getAliveNeighbours(i, j);
      if (cell.alive) {
        if (aliveNeighbours < 2 || aliveNeighbours > 3) {
          futureCell.alive = false; // mutation
          renderCell(futureCell);
        }
      } else {
        if (aliveNeighbours === 3) {
          futureCell.alive = true; // mutation
          renderCell(futureCell);
        }
      }
    });

    store.currentCells = store.nextCells; // mutation
    store.nextCells = null; // desctruction :)
  };

  const renderSingleSquare = (i, j, renderAlive) => {
    const cell = store.currentCells.getCell(i, j);

    if (renderAlive !== cell.alive) {
      cell.alive = renderAlive; // mutation
      renderCell(cell);
    }
  };

  const onMousePressed = () => {
    const i = constrain(Math.floor(p.mouseX / squareSize), 0, boardSize - 1);
    const j = constrain(Math.floor(p.mouseY / squareSize), 0, boardSize - 1);

    if (isNaN(i) || isNaN(j)) {
      return;
    }

    if (p.mouseButton === p.LEFT) {
      renderSingleSquare(i, j, true);
    } else if (p.mouseButton === p.RIGHT) {
      renderSingleSquare(i, j, false);
    }
  };

  const setupNextSimulation = () => {
    store.simulate = true;
  };

  const startInterval = () => {
    // simulationLoop();
    // side effect
    store.setupIntervalHandle(
      setInterval(setupNextSimulation, store.simulationInterval)
    );
  };

  const stopInterval = () => {
    clearInterval(store.intervalHandle); // side effect
    store.setupIntervalHandle(undefined);
  };

  const toggleSimulation = () => {
    if (store.intervalHandle === undefined) {
      startInterval();
    } else {
      stopInterval();
    }
  };

  const reseSimulation = () => {
    stopInterval();
    store.currentCells.forEach((cell) => {
      cell.alive = false;
      renderCell(cell);
    });
    store.resetIteration();
  };

  toggleButton.mouseClicked(toggleSimulation);
  resetButton.mouseClicked(reseSimulation);
  p.keyPressed = () => {
    if (p.keycode === p.SPACE) {
      toggleSimulation();
    }
  };

  reaction(
    () => store.simulationRate,
    () => {
      if (store.intervalHandle) {
        stopInterval();
        startInterval();
      }
    }
  );

  autorun(() => {
    if (store.intervalHandle) {
      toggleButton.html("Stop simulation");
    } else {
      toggleButton.html("Start simulation");
    }
  });

  return () => {
    if (store.simulate) {
      gameOfLifeSimulation();
      store.incrementIteration();
      store.simulate = false;
    }

    if (p.mouseIsPressed) {
      onMousePressed();
    }

    if (store.firstRender) {
      renderAllCells();
      store.firstRender = false;
    }

    store.updateSimulationRate(simRateSlider.value());
  };
}
