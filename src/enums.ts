export const squareSize = 8; // px
export const boardSize = 200;

export const boardWidth = squareSize * boardSize;
export const boardHeight = squareSize * boardSize;

export const screenSize: [number, number] = [boardWidth, boardHeight];
export const frameRate = 60; // fps
export const simulationRate = 30; // fps
export const simulationInterval = Math.floor(1000 / simulationRate); // ms

export const whiteProbability = 0.01;