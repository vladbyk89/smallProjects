createMaze(map);

animate();

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "ArrowUp":
      keysPressed.ArrowUp = true;
      lastKeyPressed = "ArrowUp";
      break;
    case "ArrowDown":
      keysPressed.ArrowDown = true;
      lastKeyPressed = "ArrowDown";
      break;
    case "ArrowLeft":
      keysPressed.ArrowLeft = true;
      lastKeyPressed = "ArrowLeft";
      break;
    case "ArrowRight":
      keysPressed.ArrowRight = true;
      lastKeyPressed = "ArrowRight";
      break;
  }
});

window.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "ArrowUp":
      keysPressed.ArrowUp = false;
      break;
    case "ArrowDown":
      keysPressed.ArrowDown = false;
      break;
    case "ArrowLeft":
      keysPressed.ArrowLeft = false;
      break;
    case "ArrowRight":
      keysPressed.ArrowRight = false;
      break;
  }
});
