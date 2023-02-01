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
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePacman();
    detectWallCollision();
    detectPallet();
    pacman.update();
    ghosts.forEach(function (ghost) {
        ghost.update();
        debugger;
        var collisions = [];
        walls.forEach(function (wall) {
            if (isIntersect({ circle: ghost, square: wall })) {
                collisions.push("right");
            }
            if (isIntersect({ circle: ghost, square: wall })) {
                collisions.push("left");
            }
            if (isIntersect({
                circle: __assign(__assign({}, ghost), { velocityY: -5 }),
                square: wall
            })) {
                collisions.push("up");
            }
            if (isIntersect({
                circle: __assign(__assign({}, ghost), { velocityY: 5 }),
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
