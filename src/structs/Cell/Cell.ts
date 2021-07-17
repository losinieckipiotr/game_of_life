interface CellParams {
  i: number,
  j: number,
  x?: number,
  y?: number,
  squareSize?: number,
  alive?: boolean;
}

export class Cell {
  public i: number;
  public j: number;
  public x: number;
  public y: number;
  public alive: boolean;

  constructor({
    i,
    j,
    x,
    y,
    squareSize,
    alive
  }: CellParams) {
    this.i = i // col
    this.j = j // row

    this.x = x !== undefined ? x : i * (squareSize as number) // render square x coordinate
    this.y = y !== undefined ? y : j * (squareSize as number) // render square y coordinate

    this.alive = !!alive
  }

  clone(): Cell {
    return new Cell({
      i: this.i,
      j: this.j,
      x: this.x,
      y: this.y,
      alive: this.alive
    })
  }
}
