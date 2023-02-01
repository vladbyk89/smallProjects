var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var canvas = document.querySelector(".playGround");
var ctx = canvas.getContext("2d");
canvas.height = innerHeight - 50;
canvas.width = canvas.height;
var liveScore = document.querySelector(".liveScore");
var score = 0;
var lastKeyPressed;
var pacmanSpeed = 3;
var ghostSpeed = 5;
var squareSize = canvas.width / 13;
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
var pacman = new Pacman(squareSize * 1.5, squareSize * 1.5, 0, 0);
function createMaze(maze) {
    maze.forEach(function (row, i) {
        row.forEach(function (symbol, j) {
            switch (symbol) {
                case "#":
                    var boundry = new Wall(squareSize * j, squareSize * i);
                    walls.push(boundry);
                    break;
                case ".":
                    var pallet = new Pallet(squareSize * j + squareSize / 2, squareSize * i + squareSize / 2);
                    pallets.push(pallet);
                    break;
            }
        });
    });
}
createMaze(map);
animate();
window.addEventListener("keydown", function (_a) {
    var key = _a.key;
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
window.addEventListener("keyup", function (_a) {
    var key = _a.key;
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
    for (var i = pallets.length - 1; i > 0; i--) {
        pallets[i].draw();
        if (Math.hypot(pallets[i].lastX - pacman.lastX, pallets[i].lastY - pacman.lastY) <
            pallets[i].radius + pacman.radius) {
            score++;
            liveScore.textContent = score.toString();
            pallets.splice(i, 1);
        }
    }
}
function detectWallCollision() {
    walls.forEach(function (boundry) {
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
    ghosts.forEach(function (ghost) {
        ghost.update();
        var collisions = [];
        walls.forEach(function (wall) {
            if (!collisions.includes("right") &&
                isIntersect({
                    circle: __assign(__assign({}, ghost), { velocity: { x: 5, y: 0 } }),
                    square: wall
                })) {
                collisions.push("right");
            }
            if (!collisions.includes("left") &&
                isIntersect({
                    circle: __assign(__assign({}, ghost), { velocity: { x: -5, y: 0 } }),
                    square: wall
                })) {
                collisions.push("left");
            }
            if (!collisions.includes("up") &&
                isIntersect({
                    circle: __assign(__assign({}, ghost), { velocity: { x: 0, y: -5 } }),
                    square: wall
                })) {
                collisions.push("up");
            }
            if (!collisions.includes("down") &&
                isIntersect({
                    circle: __assign(__assign({}, ghost), { velocity: { x: 0, y: 5 } }),
                    square: wall
                })) {
                collisions.push("down");
            }
            // console.log(collisions)
            if (collisions.length > ghost.prevCollisions.length) {
                ghost.prevCollisions = collisions;
            }
            if (JSON.stringify(collisions) == JSON.stringify(ghost.prevCollisions)) {
                if (ghost.velocityX > 0)
                    ghost.prevCollisions.push("right");
                else if (ghost.velocityX < 0)
                    ghost.prevCollisions.push("left");
                else if (ghost.velocityY < 0)
                    ghost.prevCollisions.push("up");
                else if (ghost.velocityY > 0)
                    ghost.prevCollisions.push("down");
                var pathways = ghost.prevCollisions.filter(function (collision) {
                    return !collisions.includes(collision);
                });
                // console.log({ pathways });
                var direction = pathways[Math.floor(Math.random() * pathways.length)];
                // console.log(direction);
            }
        });
    });
    pacman.update();
    requestAnimationFrame(animate);
}
function movePacman() {
    if (keysPressed.ArrowLeft && lastKeyPressed == "ArrowLeft") {
        for (var i = 0; i < walls.length; i++) {
            var wall = walls[i];
            if (isIntersect({
                circle: __assign(__assign({}, pacman), { velocityX: -pacmanSpeed }),
                square: wall
            })) {
                pacman.velocityX = 0;
                break;
            }
            else {
                pacman.velocityX = -pacmanSpeed;
            }
        }
    }
    else if (keysPressed.ArrowRight && lastKeyPressed == "ArrowRight") {
        for (var i = 0; i < walls.length; i++) {
            var wall = walls[i];
            if (isIntersect({
                circle: __assign(__assign({}, pacman), { velocityX: pacmanSpeed }),
                square: wall
            })) {
                pacman.velocityX = 0;
                break;
            }
            else {
                pacman.velocityX = pacmanSpeed;
            }
        }
    }
    else if (keysPressed.ArrowUp && lastKeyPressed == "ArrowUp") {
        for (var i = 0; i < walls.length; i++) {
            var wall = walls[i];
            if (isIntersect({
                circle: __assign(__assign({}, pacman), { velocityY: -pacmanSpeed }),
                square: wall
            })) {
                pacman.velocityY = 0;
                break;
            }
            else {
                pacman.velocityY = -pacmanSpeed;
            }
        }
    }
    else if (keysPressed.ArrowDown && lastKeyPressed == "ArrowDown") {
        for (var i = 0; i < walls.length; i++) {
            var wall = walls[i];
            if (isIntersect({
                circle: __assign(__assign({}, pacman), { velocityY: pacmanSpeed }),
                square: wall
            })) {
                pacman.velocityY = 0;
                break;
            }
            else {
                pacman.velocityY = pacmanSpeed;
            }
        }
    }
}
function isIntersect(_a) {
    var circle = _a.circle, square = _a.square;
    var circleTopEdge = circle.lastY - circle.radius + circle.velocityY;
    var circleBottomEdge = circle.lastY + circle.radius + circle.velocityY;
    var circleLeftEdge = circle.lastX - circle.radius + circle.velocityX;
    var circleRightEdge = circle.lastX + circle.radius + circle.velocityX;
    var squareBottomEdge = square.lastY + squareSize;
    var squareRightEdge = square.lastX;
    var squareTopEdge = square.lastY;
    var squareLeftEdge = square.lastX + squareSize;
    return (circleTopEdge <= squareBottomEdge &&
        circleRightEdge >= squareRightEdge &&
        circleBottomEdge >= squareTopEdge &&
        circleLeftEdge <= squareLeftEdge);
}
