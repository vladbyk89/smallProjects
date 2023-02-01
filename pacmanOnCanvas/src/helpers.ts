function detectPallet() {
  // reverse loop to avoide pallet flashing
  for (let i = pallets.length - 1; i > 0; i--) {
    pallets[i].draw();
    if (
      Math.hypot(
        pallets[i].lastX - pacman.lastX,
        pallets[i].lastY - pacman.lastY
      ) <
      pallets[i].radius + pacman.radius
    ) {
      score++;
      liveScore.textContent = score.toString();
      pallets.splice(i, 1);
    }
  }
}

function detectWallCollision() {
  walls.forEach((wall) => {
    wall.draw();
    if (isIntersect({ circle: pacman, square: wall })) {
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

function moveGhost(ghost: Ghost, direction: number, wall: Wall) {
  if (
    isIntersect({
      circle: { ...ghost, velocityX: direction },
      square: wall,
    })
  ) {
    ghost.velocityX = 0;
  } else {
    ghost.velocityX = direction;
  }
}


function isIntersect({ circle, square }) {
  const circleTopEdge = circle.lastY - circle.radius + circle.velocityY;
  const circleBottomEdge = circle.lastY + circle.radius + circle.velocityY;
  const circleLeftEdge = circle.lastX - circle.radius + circle.velocityX;
  const circleRightEdge = circle.lastX + circle.radius + circle.velocityX;
  const squareBottomEdge = square.lastY + squareSize;
  const squareRightEdge = square.lastX;
  const squareTopEdge = square.lastY;
  const squareLeftEdge = square.lastX + squareSize;

  return (
    circleTopEdge <= squareBottomEdge &&
    circleRightEdge >= squareRightEdge &&
    circleBottomEdge >= squareTopEdge &&
    circleLeftEdge <= squareLeftEdge
  );
}
