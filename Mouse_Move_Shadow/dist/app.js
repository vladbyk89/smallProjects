var _this = this;
var hero = document.querySelector('.hero');
var text = hero.querySelector('h1');
var walk = 200; //100px
var shadow = function (e) {
    var width = hero.offsetWidth, height = hero.offsetHeight;
    var x = e.offsetX, y = e.offsetY;
    if (_this !== e.target) {
        x += e.target.offsetLeft;
        y += +e.target.offsetTop;
    }
    // console.log(x, y);
    var xWalk = Math.round((x / width * walk) - (walk / 2));
    var yWalk = Math.round((y / height * walk) - (walk / 2));
    text.style.textShadow = "\n    " + xWalk + "px " + yWalk + "px 10px blue,\n    " + xWalk * (-1) + "px " + yWalk + "px 10px red,\n    " + xWalk * (-1) + "px " + yWalk * (-1) + "px 10px green,\n    " + xWalk + "px " + yWalk * (-1) + "px 10px yellow\n    ";
};
hero.addEventListener('mousemove', shadow);
