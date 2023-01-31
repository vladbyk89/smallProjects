function checkForWin() {
    if (palletsLeft == 0) {
        ghosts.forEach(function (ghost) { return clearInterval(ghost.timerId); });
        clearInterval(glide);
        setTimeout(function () {
            winMessage.style.opacity = "1";
        }, 200);
    }
}
function checkForScaredGhost() {
    ghosts.forEach(function (ghost) {
        if (squares[pacmanIndex].classList.contains(ghost.className) &&
            ghost.isScared) {
            squares[pacmanIndex].classList.remove(ghost.className, "ghost", "scaredGhost");
            squares[pacmanIndex].innerHTML = "";
            createPacman();
            ghost.currentIndex = ghost.startIndex;
            squares[ghost.currentIndex].classList.add("ghost", ghost.className);
            console.log("Working");
            score += 100;
            scoreEl.textContent = score.toString();
        }
    });
}
function checkForGamneOver() {
    if (squares[pacmanIndex].classList.contains("ghost") &&
        !squares[pacmanIndex].classList.contains("scaredGhost")) {
        ghosts.forEach(function (ghost) { return clearInterval(ghost.timerId); });
        loseMessage.style.opacity = "1";
        clearInterval(glide);
    }
}
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
        ghosts.forEach(function (ghost) { return (ghost.isScared = true); });
        setTimeout(unScareGhosts, 10000);
    }
}
var unScareGhosts = function () { return ghosts.forEach(function (ghost) { return (ghost.isScared = false); }); };
var getRandomDirection = function () {
    return [moveLeft, moveRight, moveUp, moveDown][Math.floor(Math.random() * 4)];
};
function checkForWall(direction) {
    if (!squares[pacmanIndex + direction].classList.contains("wall") &&
        !squares[pacmanIndex + direction].classList.contains("lair")) {
        return true;
    }
    return false;
}
