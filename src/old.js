/*

  // let iteration = 0;
  // const renderRandomSquares = () => {
  //   cellList.forEach((cell) => {
  //     const num = Math.random();
  //     const alive = num < whiteProbability;

  //     if (cell.alive !== alive) {
  //       cell.alive = alive; // mutation
  //       renderCell(cell);
  //     }
  //   });
  // };

function getColorsArray(p) {
  const whiteProbability = 0.01;

  const colorsArray = new Array(boardSize);
  for (let i = 0; i < boardSize; i++) {
    colorsArray[i] = new Array(boardSize);
    for (let j = 0; j < boardSize; j++) {
      const num = Math.random();
      const val = num < whiteProbability;
      colorsArray[i][j] = val;
    }
  }

  return colorsArray;
}

function getPostionsArray() {
  const positionsArray = new Array(boardSize);
  for (let i = 0; i < boardSize; i++) {
    positionsArray[i] = new Array(boardSize);
    for (let j = 0; j < boardSize; j++) {
      const x = i * squareSize;
      const y = j * squareSize;
      positionsArray[i][j] = { x, y };
    }
  }

  return positionsArray;
}

function mousePressed(p, { getState, setState }) {
  const { colorsArray } = getState();

  const x = p.mouseX;
  const y = p.mouseY;

  const rectI = p.constrain(Math.floor(x / squareSize), 0, boardSize - 1);
  const rectJ = p.constrain(Math.floor(y / squareSize), 0, boardSize - 1);

  if (p.mouseButton === p.LEFT) {
    colorsArray[rectI][rectJ] = true;
  } else {
    colorsArray[rectI][rectJ] = false;
  }
  setState({ renderArray: true });
}

    // const { colorsArray, renderArray } = getState();
    // if (p.mouseIsPressed) {
    //   mousePressed(p, { getState, setState });
    // }
    // if (renderArray) {
    //   for (let i = 0; i < boardSize; i++) {
    //     for (let j = 0; j < boardSize; j++) {
    //       const { x, y } = positionsArray[i][j];
    //       if (colorsArray[i][j]) {
    //         renderWhiteSquare(x, y);
    //       } else {
    //         renderBlackSquare(x, y);
    //       }
    //     }
    //   }
    //   setState({ renderArray: false });
    // }

*/
