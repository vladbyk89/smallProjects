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
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePacman();
    detectWallCollision();
    detectPallet();
    ghosts.forEach(function (ghost) {
        ghost.update();
        // const collisions: string[] = [];
        // walls.forEach((wall) => {
        //   if (
        //     !collisions.includes("right") &&
        //     isIntersect({
        //       circle: { ...ghost, velocity: { x: 5, y: 0 } },
        //       square: wall,
        //     })
        //   ) {
        //     collisions.push("right");
        //   }
        //   if (
        //     !collisions.includes("left") &&
        //     isIntersect({
        //       circle: { ...ghost, velocity: { x: -5, y: 0 } },
        //       square: wall,
        //     })
        //   ) {
        //     collisions.push("left");
        //   }
        //   if (
        //     !collisions.includes("up") &&
        //     isIntersect({
        //       circle: { ...ghost, velocity: { x: 0, y: -5 } },
        //       square: wall,
        //     })
        //   ) {
        //     collisions.push("up");
        //   }
        //   if (
        //     !collisions.includes("down") &&
        //     isIntersect({
        //       circle: { ...ghost, velocity: { x: 0, y: 5 } },
        //       square: wall,
        //     })
        //   ) {
        //     collisions.push("down");
        //   }
        //   // console.log(collisions)
        //   if (collisions.length > ghost.prevCollisions.length) {
        //     ghost.prevCollisions = collisions;
        //   }
        //   if (JSON.stringify(collisions) == JSON.stringify(ghost.prevCollisions)) {
        //     if (ghost.velocityX > 0) ghost.prevCollisions.push("right");
        //     else if (ghost.velocityX < 0) ghost.prevCollisions.push("left");
        //     else if (ghost.velocityY < 0) ghost.prevCollisions.push("up");
        //     else if (ghost.velocityY > 0) ghost.prevCollisions.push("down");
        //     const pathways = ghost.prevCollisions.filter((collision) => {
        //       return !collisions.includes(collision);
        //     });
        //     // console.log({ pathways });
        //     const direction = pathways[Math.floor(Math.random() * pathways.length)];
        //     // console.log(direction);
        //   }
        // });
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
