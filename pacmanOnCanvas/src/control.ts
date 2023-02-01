function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  movePacman();

  detectWallCollision();

  detectPallet();

  ghosts.forEach((ghost) => {
    ghost.update();

    const collisions: string[] = [];
    walls.forEach((wall) => {
      if (
        !collisions.includes("right") &&
        isIntersect({
          circle: { ...ghost, velocity: { x: 5, y: 0 } },
          square: wall,
        })
      ) {
        collisions.push("right");
      }
      if (
        !collisions.includes("left") &&
        isIntersect({
          circle: { ...ghost, velocity: { x: -5, y: 0 } },
          square: wall,
        })
      ) {
        collisions.push("left");
      }
      if (
        !collisions.includes("up") &&
        isIntersect({
          circle: { ...ghost, velocity: { x: 0, y: -5 } },
          square: wall,
        })
      ) {
        collisions.push("up");
      }
      if (
        !collisions.includes("down") &&
        isIntersect({
          circle: { ...ghost, velocity: { x: 0, y: 5 } },
          square: wall,
        })
      ) {
        collisions.push("down");
      }
      // console.log(collisions)
      if (collisions.length > ghost.prevCollisions.length) {
        ghost.prevCollisions = collisions;
      }

      if (JSON.stringify(collisions) == JSON.stringify(ghost.prevCollisions)) {
        if (ghost.velocityX > 0) ghost.prevCollisions.push("right");
        else if (ghost.velocityX < 0) ghost.prevCollisions.push("left");
        else if (ghost.velocityY < 0) ghost.prevCollisions.push("up");
        else if (ghost.velocityY > 0) ghost.prevCollisions.push("down");

        const pathways = ghost.prevCollisions.filter((collision) => {
          return !collisions.includes(collision);
        });

        // console.log({ pathways });

        const direction = pathways[Math.floor(Math.random() * pathways.length)];

        // console.log(direction);
      }
    });
  });

  pacman.update();
  requestAnimationFrame(animate);
}

function movePacman() {
  if (keysPressed.ArrowLeft && lastKeyPressed == "ArrowLeft") {
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      if (
        isIntersect({
          circle: { ...pacman, velocityX: -pacmanSpeed },
          square: wall,
        })
      ) {
        pacman.velocityX = 0;
        break;
      } else {
        pacman.velocityX = -pacmanSpeed;
      }
    }
  } else if (keysPressed.ArrowRight && lastKeyPressed == "ArrowRight") {
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      if (
        isIntersect({
          circle: { ...pacman, velocityX: pacmanSpeed },
          square: wall,
        })
      ) {
        pacman.velocityX = 0;
        break;
      } else {
        pacman.velocityX = pacmanSpeed;
      }
    }
  } else if (keysPressed.ArrowUp && lastKeyPressed == "ArrowUp") {
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      if (
        isIntersect({
          circle: { ...pacman, velocityY: -pacmanSpeed },
          square: wall,
        })
      ) {
        pacman.velocityY = 0;
        break;
      } else {
        pacman.velocityY = -pacmanSpeed;
      }
    }
  } else if (keysPressed.ArrowDown && lastKeyPressed == "ArrowDown") {
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      if (
        isIntersect({
          circle: { ...pacman, velocityY: pacmanSpeed },
          square: wall,
        })
      ) {
        pacman.velocityY = 0;
        break;
      } else {
        pacman.velocityY = pacmanSpeed;
      }
    }
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
