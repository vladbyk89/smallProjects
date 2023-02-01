const canvas = document.querySelector(".playGround") as HTMLCanvasElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.height = innerHeight - 50;
canvas.width = canvas.height;

const liveScore = document.querySelector('.liveScore') as HTMLSpanElement;
let score:number = 0;
let lastKeyPressed: string;
const pacmanSpeed: number = 3;
const ghostSpeed:number = 5;
const squareSize = canvas.width / 13;

function createMaze(maze: string[][]) {
  maze.forEach((row, i) => {
    row.forEach((symbol, j) => {
      switch (symbol) {
        case "#":
          const boundry = new Wall(squareSize * j, squareSize * i);
          walls.push(boundry);
          break;
        case ".":
          const pallet = new Pallet(squareSize * j + squareSize / 2,squareSize * i + squareSize / 2);
          pallets.push(pallet);
          break;
      }
    });
  });
}
