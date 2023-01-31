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
    function Pacman(_a) {
        var position = _a.position, velocity = _a.velocity;
        this.position = position;
        this.velocity = velocity;
        this.radius = squareSize / 2.2;
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
var Ghost = /** @class */ (function () {
    function Ghost(_a, color) {
        var position = _a.position, velocity = _a.velocity;
        if (color === void 0) { color = "pink"; }
        this.color = color;
        this.position = position;
        this.velocity = velocity;
        this.radius = squareSize / 2.2;
        this.color = color;
    }
    Ghost.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
    Ghost.prototype.update = function () {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };
    return Ghost;
}());
var Pallet = /** @class */ (function () {
    function Pallet(_a) {
        var position = _a.position;
        this.position = position;
        this.radius = squareSize / 10;
    }
    Pallet.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.closePath();
    };
    return Pallet;
}());
var Boundary = /** @class */ (function () {
    function Boundary(_a) {
        var position = _a.position;
        this.color = "blue";
        this.position = position;
    }
    Boundary.prototype.draw = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, squareSize, squareSize);
    };
    return Boundary;
}());
var keysPressed = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};
var boundries = [];
var roads = [];
var pallets = [];
var ghosts = [
    new Ghost({
        position: {
            x: squareSize * 5.5,
            y: squareSize * 5.5
        },
        velocity: {
            x: 0,
            y: 0
        }
    }),
    new Ghost({
        position: {
            x: squareSize * 7.5,
            y: squareSize * 5.5
        },
        velocity: {
            x: 0,
            y: 0
        }
    }, 'orange'),
    new Ghost({
        position: {
            x: squareSize * 5.5,
            y: squareSize * 7.5
        },
        velocity: {
            x: 0,
            y: 0
        }
    }, 'red'),
    new Ghost({
        position: {
            x: squareSize * 7.5,
            y: squareSize * 7.5
        },
        velocity: {
            x: 0,
            y: 0
        }
    }, 'purple')
];
var pacman = new Pacman({
    position: {
        x: squareSize * 1.5,
        y: squareSize * 1.5
    },
    velocity: {
        x: 0,
        y: 0
    }
});
