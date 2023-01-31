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

  pacman.update();

  requestAnimationFrame(animate);
}

function movePacman() {
  if (keysPressed.ArrowLeft && lastKeyPressed == "ArrowLeft") {
    for (let i = 0; i < boundries.length; i++) {
      const boundry = boundries[i];
      if (
        isIntersect({
          circle: { ...pacman, velocity: { x: -3, y: 0 } },
          square: boundry,
        })
      ) {
        pacman.velocity.x = 0;
        break;
      } else {
        pacman.velocity.x = -3;
      }
    }
  } else if (keysPressed.ArrowRight && lastKeyPressed == "ArrowRight") {
    for (let i = 0; i < boundries.length; i++) {
      const boundry = boundries[i];
      if (
        isIntersect({
          circle: { ...pacman, velocity: { x: 3, y: 0 } },
          square: boundry,
        })
      ) {
        pacman.velocity.x = 0;
        break;
      } else {
        pacman.velocity.x = 3;
      }
    }
  } else if (keysPressed.ArrowUp && lastKeyPressed == "ArrowUp") {
    for (let i = 0; i < boundries.length; i++) {
      const boundry = boundries[i];
      if (
        isIntersect({
          circle: { ...pacman, velocity: { x: 0, y: -3 } },
          square: boundry,
        })
      ) {
        pacman.velocity.y = 0;
        break;
      } else {
        pacman.velocity.y = -3;
      }
    }
  } else if (keysPressed.ArrowDown && lastKeyPressed == "ArrowDown") {
    for (let i = 0; i < boundries.length; i++) {
      const boundry = boundries[i];
      if (
        isIntersect({
          circle: { ...pacman, velocity: { x: 0, y: 3 } },
          square: boundry,
        })
      ) {
        pacman.velocity.y = 0;
        break;
      } else {
        pacman.velocity.y = 3;
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
  const squareBottomEdge = square.position.y + Boundary.height;
  const squareRightEdge = square.position.x;
  const squareTopEdge = square.position.y;
  const squareLeftEdge = square.position.x + Boundary.width;

  return (
    circleTopEdge <= squareBottomEdge &&
    circleRightEdge >= squareRightEdge &&
    circleBottomEdge >= squareTopEdge &&
    circleLeftEdge <= squareLeftEdge
  );
}
