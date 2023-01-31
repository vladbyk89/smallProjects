const canvas = document.querySelector(".playGround") as HTMLCanvasElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
interface location {
  x: number;
  y: number;
}
canvas.width = innerWidth;
canvas.height = innerHeight;

let lastKeyPressed: string;

const boundries: Boundary[] = [];
const pacman = new Pacman({
  position: {
    x: Boundary.width * 1.5,
    y: Boundary.height * 1.5,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});
map.forEach((row, i) => {
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

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  boundries.forEach((boundry) => boundry.draw());

  pacman.update();
  pacman.velocity.x = 0;
  pacman.velocity.y = 0;

  if (keysPressed.ArrowLeft && lastKeyPressed == "ArrowLeft") {
    pacman.velocity.x = -5;
  } else if (keysPressed.ArrowRight && lastKeyPressed == "ArrowRight") {
    pacman.velocity.x = 5;
  } else if (keysPressed.ArrowUp && lastKeyPressed == "ArrowUp") {
    pacman.velocity.y = -5;
  } else if (keysPressed.ArrowDown && lastKeyPressed == "ArrowDown") {
    pacman.velocity.y = 5;
  }
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "ArrowUp":
      keysPressed.ArrowUp = true;
      lastKeyPressed = "ArrowUp";
      break;
    case "ArrowDown":
      keysPressed.ArrowDown = true;
      lastKeyPressed = "ArrowDown";
      break;
    case "ArrowLeft":
      keysPressed.ArrowLeft = true;
      lastKeyPressed = "ArrowLeft";
      break;
    case "ArrowRight":
      keysPressed.ArrowRight = true;
      lastKeyPressed = "ArrowRight";
      break;
  }
});

window.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "ArrowUp":
      keysPressed.ArrowUp = false;
      break;
    case "ArrowDown":
      keysPressed.ArrowDown = false;
      break;
    case "ArrowLeft":
      keysPressed.ArrowLeft = false;
      break;
    case "ArrowRight":
      keysPressed.ArrowRight = false;
      break;
  }
});
