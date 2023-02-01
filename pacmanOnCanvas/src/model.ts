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
  public position: location;
  public velocity: location;
  public radius: number;
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = squareSize / 2.2;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
class Ghost {
  public position: location;
  public velocity: location;
  public radius: number;
  public prevCollisions: string[];
  constructor({ position, velocity }, public color: string = "pink") {
    this.position = position;
    this.velocity = velocity;
    this.radius = squareSize / 2.2;
    this.color = color;
    this.prevCollisions = []
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
class Pallet {
  public position: location;
  public radius: number;
  constructor({ position }) {
    this.position = position;
    this.radius = squareSize / 10;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }
}

class Boundary {
  public position: location;
  public color: string = "blue";
  constructor({ position }) {
    this.position = position;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, squareSize, squareSize);
  }
}

const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

const boundries: Boundary[] = [];
const pallets: Pallet[] = [];
const ghosts: Ghost[] = [
  new Ghost({
    position: {
      x: squareSize * 7.5,
      y: squareSize * 1.5,
    },
    velocity: {
      x: ghostSpeed,
      y: 0,
    },
  }),
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

const pacman = new Pacman({
  position: {
    x: squareSize * 1.5,
    y: squareSize * 1.5,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

interface location {
  x: number;
  y: number;
}
