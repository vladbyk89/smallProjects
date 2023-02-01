function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  movePacman();

  boundries.forEach((boundry) => {
    boundry.draw();
    if (isIntersect({ circle: pacman, square: boundry })) {
      console.log("Collision");
      pacman.velocity.x = 0;
      pacman.velocity.y = 0;
    }
  });

  // reverse loop to avoide pallet flashing
  for (let i = pallets.length - 1; i > 0; i--) {
    pallets[i].draw();
    if (
      Math.hypot(
        pallets[i].position.x - pacman.position.x,
        pallets[i].position.y - pacman.position.y
      ) <
      pallets[i].radius + pacman.radius
    ) {
      score++;
      liveScore.textContent = score.toString();
      pallets.splice(i, 1);
    }
  }

  ghosts.forEach((ghost) => {
    ghost.update();

    const collisions: string[] = [];
    boundries.forEach((boundry) => {
      if (
        !collisions.includes("right") &&
        isIntersect({
          circle: { ...ghost, velocity: { x: 5, y: 0 } },
          square: boundry,
        })
      ) {
        collisions.push("right");
      }
      if (
        !collisions.includes("left") &&
        isIntersect({
          circle: { ...ghost, velocity: { x: -5, y: 0 } },
          square: boundry,
        })
      ) {
        collisions.push("left");
      }
      if (
        !collisions.includes("up") &&
        isIntersect({
          circle: { ...ghost, velocity: { x: 0, y: -5 } },
          square: boundry,
        })
      ) {
        collisions.push("up");
      }
      if (
        !collisions.includes("down") &&
        isIntersect({
          circle: { ...ghost, velocity: { x: 0, y: 5 } },
          square: boundry,
        })
      ) {
        collisions.push("down");
      }
      console.log(collisions)
      if (collisions.length > ghost.prevCollisions.length) {
        ghost.prevCollisions = collisions;
      }

      if (JSON.stringify(collisions) == JSON.stringify(ghost.prevCollisions)) {
        if (ghost.velocity.x > 0) ghost.prevCollisions.push("right");
        else if (ghost.velocity.x < 0) ghost.prevCollisions.push("left");
        else if (ghost.velocity.y < 0) ghost.prevCollisions.push("up");
        else if (ghost.velocity.y > 0) ghost.prevCollisions.push("down");

        const pathways = ghost.prevCollisions.filter((collision) => {
          return !collisions.includes(collision);
        });

        // console.log({ pathways });

        const direction = pathways[Math.floor(Math.random() * pathways.length)];

        console.log(direction);
      }
    });
  });

  pacman.update();
  requestAnimationFrame(animate);
}

function movePacman() {
  if (keysPressed.ArrowLeft && lastKeyPressed == "ArrowLeft") {
    for (let i = 0; i < boundries.length; i++) {
      const boundry = boundries[i];
      if (
        isIntersect({
          circle: { ...pacman, velocity: { x: -pacmanSpeed, y: 0 } },
          square: boundry,
        })
      ) {
        pacman.velocity.x = 0;
        break;
      } else {
        pacman.velocity.x = -pacmanSpeed;
      }
    }
  } else if (keysPressed.ArrowRight && lastKeyPressed == "ArrowRight") {
    for (let i = 0; i < boundries.length; i++) {
      const boundry = boundries[i];
      if (
        isIntersect({
          circle: { ...pacman, velocity: { x: pacmanSpeed, y: 0 } },
          square: boundry,
        })
      ) {
        pacman.velocity.x = 0;
        break;
      } else {
        pacman.velocity.x = pacmanSpeed;
      }
    }
  } else if (keysPressed.ArrowUp && lastKeyPressed == "ArrowUp") {
    for (let i = 0; i < boundries.length; i++) {
      const boundry = boundries[i];
      if (
        isIntersect({
          circle: { ...pacman, velocity: { x: 0, y: -pacmanSpeed } },
          square: boundry,
        })
      ) {
        pacman.velocity.y = 0;
        break;
      } else {
        pacman.velocity.y = -pacmanSpeed;
      }
    }
  } else if (keysPressed.ArrowDown && lastKeyPressed == "ArrowDown") {
    for (let i = 0; i < boundries.length; i++) {
      const boundry = boundries[i];
      if (
        isIntersect({
          circle: { ...pacman, velocity: { x: 0, y: pacmanSpeed } },
          square: boundry,
        })
      ) {
        pacman.velocity.y = 0;
        break;
      } else {
        pacman.velocity.y = pacmanSpeed;
      }
    }
  }
}

function isIntersect({ circle, square }) {
  const circleTopEdge = circle.position.y - circle.radius + circle.velocity.y;
  const circleBottomEdge =
    circle.position.y + circle.radius + circle.velocity.y;
  const circleLeftEdge = circle.position.x - circle.radius + circle.velocity.x;
  const circleRightEdge = circle.position.x + circle.radius + circle.velocity.x;
  const squareBottomEdge = square.position.y + squareSize;
  const squareRightEdge = square.position.x;
  const squareTopEdge = square.position.y;
  const squareLeftEdge = square.position.x + squareSize;

  return (
    circleTopEdge <= squareBottomEdge &&
    circleRightEdge >= squareRightEdge &&
    circleBottomEdge >= squareTopEdge &&
    circleLeftEdge <= squareLeftEdge
  );
}
