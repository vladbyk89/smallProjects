var layout = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1,
    0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 9, 0, 9, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 9, 9, 9,
    7, 9, 9, 9, 9, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 9, 0, 0, 3, 3, 3, 0, 0,
    9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 9, 0, 3, 3, 3, 3, 3, 0, 9, 0, 1, 0, 0,
    0, 0, 9, 9, 9, 9, 1, 9, 9, 0, 3, 3, 3, 3, 3, 0, 9, 9, 1, 9, 9, 9, 9, 0, 0, 0,
    0, 1, 0, 9, 0, 3, 3, 3, 3, 3, 0, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 9, 0,
    0, 0, 0, 0, 0, 0, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 9, 9, 9, 9, 5, 9, 9,
    9, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 9, 0, 9, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1,
    0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1,
    0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
// 0 = wall
// 1 = point
// 2 = cherry
// 3 = lair
// an array that with hold all the divs and their classes
var squares = [];
var Pacman = /** @class */ (function () {
    function Pacman(currentIndex, nextIndex) {
        this.currentIndex = currentIndex;
        this.nextIndex = nextIndex;
    }
    Pacman.prototype.draw = function () { };
    return Pacman;
}());
var Ghost = /** @class */ (function () {
    function Ghost(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
    Ghost.prototype.draw = function () {
    };
    return Ghost;
}());
var ghosts = [
    new Ghost("blinky", 239, 250),
    new Ghost("pinky", 197, 400),
    new Ghost("inky", 201, 300),
    new Ghost("clyde", 243, 200),
];
