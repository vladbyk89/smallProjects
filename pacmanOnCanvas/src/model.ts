const map = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '#'],
  ['#', '-', '#', '-', '#', '-', '#', '#', '#', '#', '#', '#', '-', '#'],
  ['#', '-', '-', '-', '-', '-', '#', '#', '#', '#', '#', '#', '-', '#'],
  ['#', '-', '#', '-', '#', '-', '#', '#', '#', '#', '#', '#', '-', '#'],
  ['#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

class Pacman {
  public position: location;
  public velocity: location;
  public radius: number;
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = squareSize / 2.12;
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

class Boundary {
//   static width = squareSize;
//   static height = squareSize;
  public position: location;
  public color:string = 'blue';
  constructor({ position },) {
    this.position = position;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      squareSize,
      squareSize
    );
  }
}

const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};


const boundries: Boundary[] = [];
const roads: Boundary[] = [];

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