var canvas = document.querySelector(".playGround");
var ctx = canvas.getContext("2d");
canvas.width = innerHeight - 50;
canvas.height = innerHeight - 50;
var liveScore = document.querySelector('.liveScore');
var score = 0;
var lastKeyPressed;
var pacmanSpeed = 5;
var squareSize = canvas.width / 13;
function createMaze(maze) {
    maze.forEach(function (row, i) {
        row.forEach(function (symbol, j) {
            switch (symbol) {
                case "#":
                    var boundry = new Boundary({
                        position: {
                            x: squareSize * j,
                            y: squareSize * i
                        }
                    });
                    boundries.push(boundry);
                    break;
                case ".":
                    var pallet = new Pallet(new Boundary({
                        position: {
                            x: squareSize * j + squareSize / 2,
                            y: squareSize * i + squareSize / 2
                        }
                    }));
                    pallets.push(pallet);
                    break;
            }
        });
    });
}
