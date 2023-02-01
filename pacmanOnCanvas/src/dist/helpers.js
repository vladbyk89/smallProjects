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
    walls.forEach(function (wall) {
        wall.draw();
        if (isIntersect({ circle: pacman, square: wall })) {
            console.log("Collision");
            pacman.velocityX = 0;
            pacman.velocityY = 0;
        }
        ghosts.forEach(function (ghost) {
            if (isIntersect({ circle: ghost, square: wall })) {
                console.log("ghost reached wall");
                var direction = NaN;
                if (ghost.velocityX == 0) {
                    if (ghost.velocityY > 0) {
                        ghost.velocityY = -ghostSpeed;
                    }
                    ghost.velocityY = ghostSpeed;
                }
                if (ghost.velocityY == 0) {
                    if (ghost.velocityX > 0) {
                        ghost.velocityX = -ghostSpeed;
                    }
                    ghost.velocityX = ghostSpeed;
                }
            }
        });
    });
}
function moveGhost(ghost, direction, wall) {
    if (isIntersect({
        circle: __assign(__assign({}, ghost), { velocityX: direction }),
        square: wall
    })) {
        ghost.velocityX = 0;
    }
    else {
        ghost.velocityX = direction;
    }
}
