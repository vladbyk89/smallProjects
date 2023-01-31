const maze = document.querySelector(".maze") as HTMLDivElement;
const scoreEl = document.querySelector("#score") as HTMLSpanElement;
const winMessage = document.querySelector(".winMessage") as HTMLHeadElement;
const loseMessage = document.querySelector(".loseMessage") as HTMLHeadElement;
const width:number = 21;

let score:number = 0;
let palletsLeft:number = 144;
let pacmanIndex = 283;


const moveLeft = -1;
const moveRight = 1;
const moveUp = -21;
const moveDown = 21;