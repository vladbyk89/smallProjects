var map = [
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
var Pacman = /** @class */ (function () {
    function Pacman(lastX, lastY, velocityX, velocityY) {
        this.lastX = lastX;
        this.lastY = lastY;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.radius = squareSize / 2.1;
    }
    Pacman.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.lastX, this.lastY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    };
    Pacman.prototype.update = function () {
        this.draw();
        this.lastX += this.velocityX;
        this.lastY += this.velocityY;
    };
    return Pacman;
}());
var Ghost = /** @class */ (function () {
    function Ghost(lastX, lastY, velocityX, velocityY, color) {
        if (color === void 0) { color = "pink"; }
        this.lastX = lastX;
        this.lastY = lastY;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.color = color;
        this.radius = squareSize / 2.2;
        this.color = color;
        this.prevCollisions = [];
    }
    Ghost.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.lastX, this.lastY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
    Ghost.prototype.update = function () {
        this.draw();
        this.lastX += this.velocityX;
        this.lastY += this.velocityY;
    };
    return Ghost;
}());
var Pallet = /** @class */ (function () {
    function Pallet(lastX, lastY) {
        this.lastX = lastX;
        this.lastY = lastY;
        this.radius = squareSize / 10;
    }
    Pallet.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.lastX, this.lastY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.closePath();
    };
    return Pallet;
}());
var Wall = /** @class */ (function () {
    function Wall(lastX, lastY) {
        this.lastX = lastX;
        this.lastY = lastY;
        this.color = "blue";
    }
    Wall.prototype.draw = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.lastX, this.lastY, squareSize, squareSize);
    };
    return Wall;
}());
var keysPressed = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};
var walls = [];
var pallets = [];
var ghosts = [
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
var pacman = new Pacman(squareSize * 1.5, squareSize * 1.5, 0, 0);
