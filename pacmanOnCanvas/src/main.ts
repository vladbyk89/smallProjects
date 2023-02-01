const canvas = document.querySelector(".playGround") as HTMLCanvasElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.height = innerHeight - 50;
canvas.width = canvas.height;

const liveScore = document.querySelector(".liveScore") as HTMLSpanElement;
let score: number = 0;
let lastKeyPressed: string;
const pacmanSpeed: number = 3;
const ghostSpeed: number = 5;
const squareSize = canvas.width / 13;

const map = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
  ["#", ".", "#", "#", ".", "#", "#", "#", ".", "#", "#", ".", "#"],
  ["#", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", "#"],
  ["#", ".", "#", "#", "#", ".", ".", ".", "#", "#", "#", ".", "#"],
  ["#", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", "#"],
  ["#", ".", "#", "#", ".", "#", "#", "#", ".", "#", "#", ".", "#"],
  ["#", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", "#"],
  ["#", ".", "#", "#", "#", ".", ".", ".", "#", "#", "#", ".", "#"],
  ["#", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", ".", "#"],
  ["#", ".", "#", "#", ".", "#", "#", "#", ".", "#", "#", ".", "#"],
  ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

class Pacman {
  public radius: number;
  constructor(
    public lastX: number,
    public lastY: number,
    public velocityX: number,
    public velocityY: number
  ) {
    this.radius = squareSize / 2.1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.lastX, this.lastY, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.draw();
    this.lastX += this.velocityX;
    this.lastY += this.velocityY;
  }
}
class Ghost {
  public radius: number;
  public prevCollisions: string[];
  constructor(
    public lastX: number,
    public lastY: number,
    public velocityX: number,
    public velocityY: number,
    public color: string = "pink"
  ) {
    this.radius = squareSize / 2.2;
    this.color = color;
    this.prevCollisions = [];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.lastX, this.lastY, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.draw();
    this.lastX += this.velocityX;
    this.lastY += this.velocityY;
  }
}
class Pallet {
  public radius: number;
  constructor(public lastX: number, public lastY: number) {
    this.radius = squareSize / 10;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.lastX, this.lastY, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }
}

class Wall {
  public color: string = "blue";
  constructor(public lastX: number, public lastY: number) {}

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.lastX, this.lastY, squareSize, squareSize);
  }
}

const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

const walls: Wall[] = [];
const pallets: Pallet[] = [];
const ghosts: Ghost[] = [
  new Ghost(squareSize * 7.5, squareSize * 1.5, ghostSpeed, 0)
  // new Ghost({
  //   position: {
  //     x: squareSize * 7.5,
  //     y: squareSize * 1.5,
  //   },
  //   velocity: {
  //     x: ghostSpeed,
  //     y: 0,
  //   },
  // }),
  // new Ghost({
  //   position: {
  //     x: squareSize * 7.5,
  //     y: squareSize * 5.5,
  //   },
  //   velocity: {
  //     x: 0,
  //     y: 0,
  //   },
  // }, 'orange'),
  // new Ghost({
  //   position: {
  //     x: squareSize * 5.5,
  //     y: squareSize * 7.5,
  //   },
  //   velocity: {
  //     x: 0,
  //     y: 0,
  //   },
  // }, 'red'),
  // new Ghost({
  //   position: {
  //     x: squareSize * 7.5,
  //     y: squareSize * 7.5,
  //   },
  //   velocity: {
  //     x: 0,
  //     y: 0,
  //   },
  // }, 'purple')
];

const pacman = new Pacman(squareSize * 1.5, squareSize * 1.5, 0, 0);

function createMaze(maze: string[][]) {
  maze.forEach((row, i) => {
    row.forEach((symbol, j) => {
      switch (symbol) {
        case "#":
          const boundry = new Wall(squareSize * j, squareSize * i);
          walls.push(boundry);
          break;
        case ".":
          const pallet = new Pallet(
            squareSize * j + squareSize / 2,
            squareSize * i + squareSize / 2
          );
          pallets.push(pallet);
          break;
      }
    });
  });
}

createMaze(map);

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

function detectPallet() {
  // reverse loop to avoide pallet flashing
  for (let i = pallets.length - 1; i > 0; i--) {
    pallets[i].draw();
    if (
      Math.hypot(
        pallets[i].lastX - pacman.lastX,
        pallets[i].lastY - pacman.lastY
      ) <
      pallets[i].radius + pacman.radius
    ) {
      score++;
      liveScore.textContent = score.toString();
      pallets.splice(i, 1);
    }
  }
}

function detectWallCollision() {
  walls.forEach((boundry) => {
    boundry.draw();
    if (isIntersect({ circle: pacman, square: boundry })) {
      console.log("Collision");
      pacman.velocityX = 0;
      pacman.velocityY = 0;
    }
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  movePacman();

  detectWallCollision();

  detectPallet();

  ghosts.forEach((ghost) => {
    ghost.update();

    const collisions: string[] = [];
    walls.forEach((wall) => {
      if (
        !collisions.includes("right") &&
        isIntersect({
          circle: { ...ghost, velocity: { x: 5, y: 0 } },
          square: wall,
        })
      ) {
        collisions.push("right");
      }
      if (
        !collisions.includes("left") &&
        isIntersect({
          circle: { ...ghost, velocity: { x: -5, y: 0 } },
          square: wall,
        })
      ) {
        collisions.push("left");
      }
      if (
        !collisions.includes("up") &&
        isIntersect({
          circle: { ...ghost, velocity: { x: 0, y: -5 } },
          square: wall,
        })
      ) {
        collisions.push("up");
      }
      if (
        !collisions.includes("down") &&
        isIntersect({
          circle: { ...ghost, velocity: { x: 0, y: 5 } },
          square: wall,
        })
      ) {
        collisions.push("down");
      }
      // console.log(collisions)
      if (collisions.length > ghost.prevCollisions.length) {
        ghost.prevCollisions = collisions;
      }

      if (JSON.stringify(collisions) == JSON.stringify(ghost.prevCollisions)) {
        if (ghost.velocityX > 0) ghost.prevCollisions.push("right");
        else if (ghost.velocityX < 0) ghost.prevCollisions.push("left");
        else if (ghost.velocityY < 0) ghost.prevCollisions.push("up");
        else if (ghost.velocityY > 0) ghost.prevCollisions.push("down");

        const pathways = ghost.prevCollisions.filter((collision) => {
          return !collisions.includes(collision);
        });

        // console.log({ pathways });

        const direction = pathways[Math.floor(Math.random() * pathways.length)];

        // console.log(direction);
      }
    });
  });

  pacman.update();
  requestAnimationFrame(animate);
}

function movePacman() {
  if (keysPressed.ArrowLeft && lastKeyPressed == "ArrowLeft") {
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      if (
        isIntersect({
          circle: { ...pacman, velocityX: -pacmanSpeed },
          square: wall,
        })
      ) {
        pacman.velocityX = 0;
        break;
      } else {
        pacman.velocityX = -pacmanSpeed;
      }
    }
  } else if (keysPressed.ArrowRight && lastKeyPressed == "ArrowRight") {
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      if (
        isIntersect({
          circle: { ...pacman, velocityX: pacmanSpeed },
          square: wall,
        })
      ) {
        pacman.velocityX = 0;
        break;
      } else {
        pacman.velocityX = pacmanSpeed;
      }
    }
  } else if (keysPressed.ArrowUp && lastKeyPressed == "ArrowUp") {
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      if (
        isIntersect({
          circle: { ...pacman, velocityY: -pacmanSpeed },
          square: wall,
        })
      ) {
        pacman.velocityY = 0;
        break;
      } else {
        pacman.velocityY = -pacmanSpeed;
      }
    }
  } else if (keysPressed.ArrowDown && lastKeyPressed == "ArrowDown") {
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      if (
        isIntersect({
          circle: { ...pacman, velocityY: pacmanSpeed },
          square: wall,
        })
      ) {
        pacman.velocityY = 0;
        break;
      } else {
        pacman.velocityY = pacmanSpeed;
      }
    }
  }
}

function isIntersect({ circle, square }) {
  const circleTopEdge = circle.lastY - circle.radius + circle.velocityY;
  const circleBottomEdge = circle.lastY + circle.radius + circle.velocityY;
  const circleLeftEdge = circle.lastX - circle.radius + circle.velocityX;
  const circleRightEdge = circle.lastX + circle.radius + circle.velocityX;
  const squareBottomEdge = square.lastY + squareSize;
  const squareRightEdge = square.lastX;
  const squareTopEdge = square.lastY;
  const squareLeftEdge = square.lastX + squareSize;

  return (
    circleTopEdge <= squareBottomEdge &&
    circleRightEdge >= squareRightEdge &&
    circleBottomEdge >= squareTopEdge &&
    circleLeftEdge <= squareLeftEdge
  );
}
