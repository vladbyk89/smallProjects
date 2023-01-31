var map = [
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", " ", " ", " ", " ", " ", "-"],
    ["-", " ", "-", " ", "-", " ", "-"],
    ["-", " ", " ", " ", " ", " ", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
];
var Pacman = /** @class */ (function () {
    function Pacman(_a) {
        var position = _a.position, velocity = _a.velocity;
        this.position = position;
        this.velocity = velocity;
        this.radius = 18;
    }
    Pacman.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    };
    Pacman.prototype.update = function () {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };
    return Pacman;
}());
var Boundary = /** @class */ (function () {
    function Boundary(_a) {
        var position = _a.position;
        this.position = position;
    }
    Boundary.prototype.draw = function () {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.position.x, this.position.y, Boundary.width, Boundary.height);
    };
    Boundary.width = 40;
    Boundary.height = 40;
    return Boundary;
}());
var keysPressed = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};
var boundries = [];
var pacman = new Pacman({
    position: {
        x: Boundary.width * 1.5,
        y: Boundary.height * 1.5
    },
    velocity: {
        x: 0,
        y: 0
    }
});
