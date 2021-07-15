import { Cell } from "./Cell";

test("Should cell valid props", () => {
  const cell = new Cell({
    i: 0,
    j: 0,
    x: 0,
    y: 0,
    alive: false
  });

  expect(cell.i).toBe(0);
  expect(cell.j).toBe(0);
  expect(cell.x).toBe(0);
  expect(cell.y).toBe(0);
  expect(cell.alive).toBe(false);
});
