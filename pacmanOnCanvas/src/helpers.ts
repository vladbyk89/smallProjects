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
  walls.forEach((boundry) => {
    boundry.draw();
    if (isIntersect({ circle: pacman, square: boundry })) {
      console.log("Collision");
      pacman.velocityX = 0;
      pacman.velocityY = 0;
    }
  });
}
