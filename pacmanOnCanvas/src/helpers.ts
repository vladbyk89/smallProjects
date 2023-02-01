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

    ghosts.forEach((ghost) => {
      if (isIntersect({ circle: ghost, square: wall })) {
        console.log("ghost reached wall");
        let direction: number = NaN;
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
