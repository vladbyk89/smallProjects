var canvas = document.querySelector(".playGround");
var ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
var lastKeyPressed;
function createMaze(maze) {
    maze.forEach(function (row, i) {
        row.forEach(function (symbol, j) {
            switch (symbol) {
                case "-" || "|":
                    boundries.push(new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        }
                    }));
                    break;
            }
        });
    });
}
