const map = [
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", " ", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
];

class Pacman {
  public position: location;
  public velocity: location;
  public radius: number;
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 18;
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
  static width = 40;
  static height = 40;
  public position: location;
  constructor({ position }) {
    this.position = position;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      Boundary.width,
      Boundary.height
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


interface location {
    x: number;
    y: number;
  }