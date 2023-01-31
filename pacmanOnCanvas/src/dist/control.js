var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePacman();
    boundries.forEach(function (boundry) {
        boundry.draw();
        if (isIntersect({ circle: pacman, square: boundry })) {
            console.log("Collision");
            pacman.velocity.x = 0;
            pacman.velocity.y = 0;
        }
    });
    roads.forEach(function (road) { return road.draw(); });
    pacman.update();
    requestAnimationFrame(animate);
}
function movePacman() {
    if (keysPressed.ArrowLeft && lastKeyPressed == "ArrowLeft") {
        for (var i = 0; i < boundries.length; i++) {
            var boundry = boundries[i];
            if (isIntersect({
                circle: __assign(__assign({}, pacman), { velocity: { x: -pacmanSpeed, y: 0 } }),
                square: boundry
            })) {
                pacman.velocity.x = 0;
                break;
            }
            else {
                pacman.velocity.x = -pacmanSpeed;
            }
        }
    }
    else if (keysPressed.ArrowRight && lastKeyPressed == "ArrowRight") {
        for (var i = 0; i < boundries.length; i++) {
            var boundry = boundries[i];
            if (isIntersect({
                circle: __assign(__assign({}, pacman), { velocity: { x: pacmanSpeed, y: 0 } }),
                square: boundry
            })) {
                pacman.velocity.x = 0;
                break;
            }
            else {
                pacman.velocity.x = pacmanSpeed;
            }
        }
    }
    else if (keysPressed.ArrowUp && lastKeyPressed == "ArrowUp") {
        for (var i = 0; i < boundries.length; i++) {
            var boundry = boundries[i];
            if (isIntersect({
                circle: __assign(__assign({}, pacman), { velocity: { x: 0, y: -pacmanSpeed } }),
                square: boundry
            })) {
                pacman.velocity.y = 0;
                break;
            }
            else {
                pacman.velocity.y = -pacmanSpeed;
            }
        }
    }
    else if (keysPressed.ArrowDown && lastKeyPressed == "ArrowDown") {
        for (var i = 0; i < boundries.length; i++) {
            var boundry = boundries[i];
            if (isIntersect({
                circle: __assign(__assign({}, pacman), { velocity: { x: 0, y: pacmanSpeed } }),
                square: boundry
            })) {
                pacman.velocity.y = 0;
                break;
            }
            else {
                pacman.velocity.y = pacmanSpeed;
            }
        }
    }
}
function isIntersect(_a) {
    var circle = _a.circle, square = _a.square;
    var circleTopEdge = circle.position.y - circle.radius + circle.velocity.y;
    var circleBottomEdge = circle.position.y + circle.radius + circle.velocity.y;
    var circleLeftEdge = circle.position.x - circle.radius + circle.velocity.x;
    var circleRightEdge = circle.position.x + circle.radius + circle.velocity.x;
    var squareBottomEdge = square.position.y + squareSize;
    var squareRightEdge = square.position.x;
    var squareTopEdge = square.position.y;
    var squareLeftEdge = square.position.x + squareSize;
    return (circleTopEdge <= squareBottomEdge &&
        circleRightEdge >= squareRightEdge &&
        circleBottomEdge >= squareTopEdge &&
        circleLeftEdge <= squareLeftEdge);
}
