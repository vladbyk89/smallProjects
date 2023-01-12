const hero = document.querySelector('.hero') as HTMLDivElement;
const text = hero.querySelector('h1') as HTMLHeadElement;
const walk = 200; //100px

const shadow = (e) => {
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;

    if (this !== e.target){
        x += e.target.offsetLeft
        y += + e.target.offsetTop
    }
    // console.log(x, y);

    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));

    text.style.textShadow = `
    ${xWalk}px ${yWalk}px 10px blue,
    ${xWalk * (-1)}px ${yWalk}px 10px red,
    ${xWalk * (-1)}px ${yWalk * (-1)}px 10px green,
    ${xWalk}px ${yWalk * (-1)}px 10px yellow
    `
}

hero.addEventListener('mousemove', shadow)