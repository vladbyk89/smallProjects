function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePacman();
    detectWallCollision();
    detectPallet();
    pacman.update();
    ghosts.forEach(function (ghost) {
        ghost.update();
        var collisions = [];
        walls.forEach(function (wall) {
            if (!collisions.includes("right") &&
                isIntersect({ circle: ghost, square: wall }, ghostSpeed, 0)) {
                collisions.push("right");
            }
            if (!collisions.includes("left") &&
                isIntersect({ circle: ghost, square: wall }, -ghostSpeed, 0)) {
                collisions.push("left");
            }
            if (!collisions.includes("up") &&
                isIntersect({
                    circle: ghost,
                    square: wall
                }, 0, -ghostSpeed)) {
                collisions.push("up");
            }
            if (!collisions.includes("down") &&
                isIntersect({
                    circle: ghost,
                    square: wall
                }, 0, ghostSpeed)) {
                collisions.push("down");
            }
            if (collisions.length > ghost.prevCollisions.length) {
                ghost.prevCollisions = collisions;
            }
            // console.log(collisions);
            // console.log(ghost.prevCollisions)
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
                circle: pacman,
                square: wall
            }, -pacmanSpeed, 0)) {
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
                circle: pacman,
                square: wall
            }, pacmanSpeed, 0)) {
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
                circle: pacman,
                square: wall
            }, 0, -pacmanSpeed)) {
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
                circle: pacman,
                square: wall
            }, 0, pacmanSpeed)) {
                pacman.velocityY = 0;
                break;
            }
            else {
                pacman.velocityY = pacmanSpeed;
            }
        }
    }
}
