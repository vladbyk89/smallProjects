var canvas = document.querySelector(".playGround");
var ctx = canvas.getContext("2d");
canvas.height = innerHeight - 50;
canvas.width = canvas.height;
var liveScore = document.querySelector('.liveScore');
var score = 0;
var lastKeyPressed;
var pacmanSpeed = 3;
var ghostSpeed = 5;
var squareSize = canvas.width / 13;
function createMaze(maze) {
    maze.forEach(function (row, i) {
        row.forEach(function (symbol, j) {
            switch (symbol) {
                case "#":
                    var boundry = new Wall(squareSize * j, squareSize * i);
                    walls.push(boundry);
                    break;
                case ".":
                    var pallet = new Pallet(squareSize * j + squareSize / 2, squareSize * i + squareSize / 2);
                    pallets.push(pallet);
                    break;
            }
        });
    });
}
