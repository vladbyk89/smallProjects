console.log("Start");
document.addEventListener("keydown", function (e) {
    if (e.repeat)
        return;
    switch (e.key) {
        case "ArrowLeft":
            movePacman("left");
            break;
        case "ArrowRight":
            movePacman("right");
            break;
        case "ArrowUp":
            movePacman("up");
            break;
        case "ArrowDown":
            movePacman("down");
            break;
    }
});
creatMaze();
intializeGhosts();
createPacman();
var glide = setInterval(movePacman, 200);
// let glide = requestAnimationFrame(movePacman)
var interval = setInterval(checkForScaredGhost, 1);
