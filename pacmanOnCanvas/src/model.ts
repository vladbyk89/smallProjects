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

const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

class Pacman {
  public radius: number;
  constructor(
    public lastX: number,
    public lastY: number,
    public velocityX: number,
    public velocityY: number
  ) {
    this.radius = squareSize / 2.15;
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

const pacman = new Pacman(squareSize * 1.5, squareSize * 1.5, 0, 0);
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

const pallets: Pallet[] = [];

class Wall {
  public color: string = "blue";
  constructor(public lastX: number, public lastY: number) {}

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.lastX, this.lastY, squareSize, squareSize);
  }
}

const walls: Wall[] = [];

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

const ghosts: Ghost[] = [
  new Ghost(squareSize * 6.5, squareSize * 1.5, 0, 0),
  // new Ghost(squareSize * 7.5, squareSize * 5.5, ghostSpeed, 0, 'red'),
  // new Ghost(squareSize * 5.5, squareSize * 5.5, -ghostSpeed, 0, 'purple'),
  // new Ghost(squareSize * 5.5, squareSize * 7.5, -ghostSpeed, 0, 'green')
  // new Ghost({
  //   position: {
  //     x: ,
  //     y: ,
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