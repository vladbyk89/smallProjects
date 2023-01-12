var pressed = [];
var secretCode = "slava";
window.addEventListener("keyup", function (e) {
    console.log(e.key);
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join("") === secretCode) {
        console.log('Correct password');
    }
});
