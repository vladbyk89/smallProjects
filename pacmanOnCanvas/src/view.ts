const canvas = document.querySelector(".playGround") as HTMLCanvasElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = innerHeight - 50;
canvas.height = innerHeight - 50;

const liveScore = document.querySelector('.liveScore') as HTMLSpanElement;
let score:number = 0;
let lastKeyPressed: string;
const pacmanSpeed: number = 5;
const ghostSpeed:number = 5;
const squareSize = canvas.width / 13;

function createMaze(maze: string[][]) {
  maze.forEach((row, i) => {
    row.forEach((symbol, j) => {
      switch (symbol) {
        case "#":
          const boundry = new Boundary({
            position: {
              x: squareSize * j,
              y: squareSize * i,
            },
          });
          boundries.push(boundry);
          break;
        case ".":
          const pallet = new Pallet(
            new Boundary({
              position: {
                x: squareSize * j + squareSize / 2,
                y: squareSize * i + squareSize / 2,
              },
            })
          );
          pallets.push(pallet);
          break;
      }
    });
  });
}
