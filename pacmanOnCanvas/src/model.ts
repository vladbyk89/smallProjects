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

