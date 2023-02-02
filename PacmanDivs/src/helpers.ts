function checkForPoint() {
  if (squares[pacmanIndex].classList.contains("point")) {
    score++;
    palletsLeft--;
    scoreEl.textContent = score.toString();
    squares[pacmanIndex].classList.remove("point");
    squares[pacmanIndex].classList.add("pacman");
  }
}

function checkForCherry() {
  if (squares[pacmanIndex].classList.contains("cherry")) {
    score += 10;
    scoreEl.textContent = score.toString();
    squares[pacmanIndex].classList.remove("cherry");
    squares[pacmanIndex].classList.add("pacman");
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(unScareGhosts, 10000);
  }
}

function unScareGhosts() {
  ghosts.forEach((ghost) => (ghost.isScared = false));
}

function checkForGamneOver() {
  if (
    squares[pacmanIndex].classList.contains("ghost") &&
    !squares[pacmanIndex].classList.contains("scaredGhost")
  ) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    loseMessage.style.opacity = "1";
    clearInterval(glide);
  }
}

function checkForWin() {
  if (palletsLeft == 0) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    clearInterval(glide);
    setTimeout(() => {
      winMessage.style.opacity = "1";
    }, 200);
  }
}

function checkForScaredGhost() {
  ghosts.forEach((ghost) => {
    if (
      squares[pacmanIndex].classList.contains(ghost.className) &&
      ghost.isScared
    ) {
      squares[pacmanIndex].classList.remove(
        ghost.className,
        "ghost",
        "scaredGhost"
      );
      squares[pacmanIndex].innerHTML = "";
      squares[pacmanIndex].append(eye);
      squares[pacmanIndex].append(mouth);
      ghost.currentIndex = ghost.startIndex;
      squares[ghost.currentIndex].classList.add("ghost", ghost.className);
      console.log("Working");
      score += 100;
      scoreEl.textContent = score.toString();
    }
  });
}
