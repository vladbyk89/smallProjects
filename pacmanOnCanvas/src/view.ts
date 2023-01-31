const canvas = document.querySelector(".playGround") as HTMLCanvasElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = innerWidth;
canvas.height = innerHeight;

let lastKeyPressed: string;

function createMaze(maze: string[][]) {
    maze.forEach((row, i) => {
      row.forEach((symbol, j) => {
        switch (symbol) {
          case "-" || "|":
            boundries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
              })
            );
            break;
        }
      });
    });
  }