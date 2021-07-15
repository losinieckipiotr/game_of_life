export class Cell {
  constructor({ i, j, x, y, squareSize, alive }) {
    this.i = i; // col
    this.j = j; // row

    this.x = x !== undefined ? x : i * squareSize; // render square x coordinate
    this.y = y !== undefined ? y : j * squareSize; // render square y coordinate

    this.alive = !!alive;
  }

  clone() {
    return new Cell({
      i: this.i,
      j: this.j,
      x: this.x,
      y: this.y,
      alive: this.alive
    });
  }
}
