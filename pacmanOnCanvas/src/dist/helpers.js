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
        if (isIntersect({ circle: pacman, square: wall }, pacman.velocityX, pacman.velocityY)) {
            console.log("Collision");
            pacman.velocityX = 0;
            pacman.velocityY = 0;
        }
        // ghosts.forEach((ghost) => {
        //   walls.forEach((wall) => {
        //     if (isIntersect({ circle: ghost, square: wall })) {
        //       console.log("ghost reached wall");
        //       let direction: number = NaN;
        //       if (ghost.velocityX == 0) {
        //         if (ghost.velocityY > 0) {
        //           ghost.velocityY = -ghostSpeed;
        //         } else {
        //           ghost.velocityY = ghostSpeed;
        //         }
        //       }
        //       if (ghost.velocityY == 0) {
        //         if (ghost.velocityX > 0) {
        //           ghost.velocityX = -ghostSpeed;
        //         } else {
        //           ghost.velocityX = ghostSpeed;
        //         }
        //       }
        //     }
        //   });
        // });
    });
}
// function moveGhost(ghost: Ghost, direction: number, wall: Wall) {
//   if (
//     isIntersect({
//       circle: { ...ghost, velocityX: direction },
//       square: wall,
//     })
//   ) {
//     ghost.velocityX = 0;
//   } else {
//     ghost.velocityX = direction;
//   }
// }
function isIntersect(_a, vx, vy) {
    var circle = _a.circle, square = _a.square;
    var circleTopEdge = circle.lastY - circle.radius + vy;
    var circleBottomEdge = circle.lastY + circle.radius + vy;
    var circleLeftEdge = circle.lastX - circle.radius + vx;
    var circleRightEdge = circle.lastX + circle.radius + vx;
    var squareBottomEdge = square.lastY + squareSize;
    var squareRightEdge = square.lastX;
    var squareTopEdge = square.lastY;
    var squareLeftEdge = square.lastX + squareSize;
    return (circleTopEdge <= squareBottomEdge &&
        circleRightEdge >= squareRightEdge &&
        circleBottomEdge >= squareTopEdge &&
        circleLeftEdge <= squareLeftEdge);
}
