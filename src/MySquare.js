export function MySquare(p, { size, color }) {
  return (x, y) => {
    // p.push();
    p.fill(color);
    p.rect(x, y, size, size);
    // p.pop();
  };
}

// export function moveHorizontal(p, { start, moveBy }) {
//   let positionX = start;

//   return () => {
//     positionX += moveBy;

//     // if outside screen move to start
//     if (positionX >= p.width) {
//       positionX = 0;
//     }

//     return positionX;
//   };
// }

// export function getMovingSquare(p, { size, color, startX, startY, moveBy }) {
//   const square = MySquare(p, { size, color });
//   const moveSquare = moveHorizontal(p, { start: startX, moveBy });
//   return () => square(moveSquare(), startY);
// }
