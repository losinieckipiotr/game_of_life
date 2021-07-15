import { Cell } from "./Cell";

export class CellList {
  constructor({ boardSize, squareSize, cellsMap: oldCellsMap }) {
    this.boardSize = boardSize;
    this.squareSize = squareSize;
    this.cellsMap = new Array(boardSize);

    if (oldCellsMap) {
      for (let i = 0; i < boardSize; i++) {
        this.cellsMap[i] = new Array(boardSize);
        for (let j = 0; j < boardSize; j++) {
          const newCell = oldCellsMap[i][j].clone();
          this.cellsMap[i][j] = newCell;
        }
      }
    } else {
      for (let i = 0; i < boardSize; i++) {
        this.cellsMap[i] = new Array(boardSize);
        for (let j = 0; j < boardSize; j++) {
          const cell = new Cell({ i, j, squareSize });
          this.cellsMap[i][j] = cell;
        }
      }
    }
  }

  clone() {
    return new CellList({
      boardSize: this.boardSize,
      squareSize: this.squareSize,
      cellsMap: this.cellsMap
    });
  }

  forEach(callback) {
    const { boardSize } = this;

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        callback(this.cellsMap[i][j]);
      }
    }
  }

  getCell(i, j) {
    return this.cellsMap[i][j];
  }

  getNeighbourVal(i, j) {
    const { boardSize } = this;
    const maxIndex = boardSize - 1;
    if (i < 0 || i > maxIndex || j < 0 || j > maxIndex) {
      return 0;
    }
    const cell = this.cellsMap[i][j];
    return cell.alive ? 1 : 0;
  }

  getAliveNeighbours(i, j) {
    let sum = 0;

    sum += this.getNeighbourVal(i - 1, j - 1);
    sum += this.getNeighbourVal(i, j - 1);
    sum += this.getNeighbourVal(i + 1, j - 1);
    sum += this.getNeighbourVal(i + 1, j);
    sum += this.getNeighbourVal(i + 1, j + 1);
    sum += this.getNeighbourVal(i, j + 1);
    sum += this.getNeighbourVal(i - 1, j + 1);
    sum += this.getNeighbourVal(i - 1, j);

    return sum;
  }
}
