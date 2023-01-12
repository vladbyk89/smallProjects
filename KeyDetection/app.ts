const pressed: string[] = [];
const secretCode = "slava";

window.addEventListener("keyup", (e) => {
  console.log(e.key);
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);

  if (pressed.join("") === secretCode) {
    console.log('Correct password')
  }
});
