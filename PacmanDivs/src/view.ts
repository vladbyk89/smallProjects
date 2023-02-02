const maze = document.querySelector(".maze") as HTMLDivElement;
const scoreEl = document.querySelector("#score") as HTMLSpanElement;
let score = 0;
let palletsLeft = 144;
const MAX_SCORE = 144;
let width = 21;
const winMessage = document.querySelector(".winMessage") as HTMLHeadElement;
const loseMessage = document.querySelector(".loseMessage") as HTMLHeadElement;



const eye = document.createElement("div") as HTMLDivElement;
eye.classList.add("eye");
const mouth = document.createElement("div") as HTMLDivElement;
mouth.classList.add("mouth");