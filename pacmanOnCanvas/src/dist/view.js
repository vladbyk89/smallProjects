var canvas = document.querySelector(".playGround");
var ctx = canvas.getContext("2d");
canvas.width = innerHeight - 50;
canvas.height = innerHeight - 50;
var lastKeyPressed;
var pacmanSpeed = 3;
var squareSize = canvas.width / 14;
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
                case "!":
                    var road = new Boundary(new Boundary({
                        position: {
                            x: squareSize * j,
                            y: squareSize * i
                        }
                    }));
                    road.color = "red";
                    roads.push(road);
                    break;
            }
        });
    });
}
