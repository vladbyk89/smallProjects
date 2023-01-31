function creatMaze() {
    for (var i = 0; i < layout.length; i++) {
        var square = document.createElement("div");
        maze.appendChild(square);
        squares.push(square);
        switch (layout[i]) {
            case 0:
                squares[i].classList.add("wall");
                break;
            case 1:
                squares[i].classList.add("point");
                break;
            case 2:
                squares[i].classList.add("cherry");
                break;
            case 3:
                squares[i].classList.add("lair");
                break;
        }
    }
}
function createPacman() {
    var eye = document.createElement("div");
    eye.classList.add("eye");
    var mouth = document.createElement("div");
    mouth.classList.add("mouth");
    squares[pacmanIndex].classList.add("pacman");
    squares[pacmanIndex].append(eye);
    squares[pacmanIndex].append(mouth);
}
function intializeGhosts() {
    // draw ghosts to grid
    ghosts.forEach(function (ghost) {
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
        squares[ghost.currentIndex].innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M50.8 452.1L19.2 477.4c-2.1 1.7-4.7 2.6-7.4 2.6C5.3 480 0 474.7 0 468.2V192C0 86 86 0 192 0S384 86 384 192V468.2c0 6.5-5.3 11.8-11.8 11.8c-2.7 0-5.3-.9-7.4-2.6l-31.6-25.3c-3.3-2.7-7.5-4.1-11.8-4.1c-5.9 0-11.5 2.8-15 7.5l-37.6 50.1c-3 4-7.8 6.4-12.8 6.4s-9.8-2.4-12.8-6.4l-38.4-51.2c-3-4-7.8-6.4-12.8-6.4s-9.8 2.4-12.8 6.4l-38.4 51.2c-3 4-7.8 6.4-12.8 6.4s-9.8-2.4-12.8-6.4L77.6 455.5c-3.6-4.7-9.1-7.5-15-7.5c-4.3 0-8.4 1.5-11.7 4.1zM160 192c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm96 32c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z"/></svg>';
    });
    //move each ghost randomly
    ghosts.forEach(function (ghost) { return moveGhost(ghost); });
}
function movePacman(direction) {
    squares[pacmanIndex].classList.remove("pacman");
    switch (direction) {
        case "left":
            if (checkForWall(moveLeft)) {
                clearInterval(glide);
                squares[pacmanIndex].removeAttribute("style"); //removing the style attribute from square that pacman leaves
                pacmanIndex -= 1;
                squares[pacmanIndex].style.transform = "scaleX(-1)";
                glide = setInterval(movePacman, 200, "left");
            }
            else if (pacmanIndex == 210) {
                squares[pacmanIndex].removeAttribute("style");
                pacmanIndex = 230;
                squares[pacmanIndex].style.transform = "scaleX(-1)";
            }
            break;
        case "right":
            if (checkForWall(moveRight)) {
                clearInterval(glide);
                squares[pacmanIndex].removeAttribute("style");
                pacmanIndex += 1;
                squares[pacmanIndex].style.transform = "scaleX(1)";
                glide = setInterval(movePacman, 200, "right");
            }
            else if (pacmanIndex == 230) {
                squares[pacmanIndex].removeAttribute("style");
                pacmanIndex = 210;
                squares[pacmanIndex].style.transform = "scaleX(1)";
            }
            break;
        case "up":
            if (checkForWall(moveUp)) {
                clearInterval(glide);
                squares[pacmanIndex].removeAttribute("style");
                pacmanIndex -= width;
                squares[pacmanIndex].style.transform = "rotate(-90deg)";
                glide = setInterval(movePacman, 200, "up");
            }
            break;
        case "down":
            if (checkForWall(moveDown)) {
                clearInterval(glide);
                squares[pacmanIndex].removeAttribute("style");
                pacmanIndex += width;
                squares[pacmanIndex].style.transform = "rotate(90deg)";
                glide = setInterval(movePacman, 200, "down");
            }
            break;
    }
    createPacman();
    checkForPoint();
    checkForCherry();
    checkForGamneOver();
    checkForWin();
    // checkForScaredGhost();
}
//move ghost function
function moveGhost(ghost) {
    var direction = getRandomDirection();
    ghost.timerId = setInterval(function test() {
        // if the square in the direction the ghost is going not containing another ghost or a wall => then he can move here
        if (!squares[ghost.currentIndex + direction].classList.contains("wall") &&
            !squares[ghost.currentIndex + direction].classList.contains("ghost")) {
            squares[ghost.currentIndex].innerHTML = "";
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scaredGhost");
            ghost.currentIndex += direction;
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            squares[ghost.currentIndex].innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M50.8 452.1L19.2 477.4c-2.1 1.7-4.7 2.6-7.4 2.6C5.3 480 0 474.7 0 468.2V192C0 86 86 0 192 0S384 86 384 192V468.2c0 6.5-5.3 11.8-11.8 11.8c-2.7 0-5.3-.9-7.4-2.6l-31.6-25.3c-3.3-2.7-7.5-4.1-11.8-4.1c-5.9 0-11.5 2.8-15 7.5l-37.6 50.1c-3 4-7.8 6.4-12.8 6.4s-9.8-2.4-12.8-6.4l-38.4-51.2c-3-4-7.8-6.4-12.8-6.4s-9.8 2.4-12.8 6.4l-38.4 51.2c-3 4-7.8 6.4-12.8 6.4s-9.8-2.4-12.8-6.4L77.6 455.5c-3.6-4.7-9.1-7.5-15-7.5c-4.3 0-8.4 1.5-11.7 4.1zM160 192c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm96 32c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z"/></svg>';
        }
        //else => find another direction
        else {
            direction = getRandomDirection();
            checkForGamneOver();
        }
        //Change ghost color if scared
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add("scaredGhost");
        }
    }, ghost.speed);
}
