const canvas = document.querySelector(".playGround") as HTMLCanvasElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = innerHeight - 50;
canvas.height = innerHeight - 50;

let lastKeyPressed: string;
const pacmanSpeed: number = 3;
const squareSize = canvas.width / 14;

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
        case "!":
          const road = new Boundary(
            new Boundary({
              position: {
                x: squareSize * j,
                y: squareSize * i,
              },
            })
          );
          road.color = "red";
          roads.push(road);
          break;
      }
    });
  });
}
