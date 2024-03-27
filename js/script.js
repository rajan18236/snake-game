// variables 
const playGround = document.querySelector(".play-ground")
const score = document.querySelector("#score");
const music = new Audio("../audio/food.mp3");
const gameOver = new Audio("../audio/game-over.mp3 ");
const foodSound = new Audio("../audio/apple.mp3");
const tex = document.querySelector("#text");

let inputDir = { x: 0, y: 0 };
let speed = 4;
let lastPaintTime = 0;
let snakeArr = [
    { x: 6, y: 7 }
];
let food = { x: 16, y: 17 };
let scorePoint = 0;


// game function
const main = (cTime) => {

    window.requestAnimationFrame(main);

    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = cTime;
    gameFunction();
}

function isCollide(snake) {
    // bump into body
    for (let index = 1; index < snakeArr.length; index++) {
        if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
            return true;
        }
    }

    // crash into wall 
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}


const gameFunction = () => {
    // part 1 update snake and food
    if (isCollide(snakeArr)) {
        gameOver.play()
        alert("GAME OVER")
        gameOver.pause()
        tex.classList.remove("hide")
        inputDir = { x: 0, y: 0 };
        snakeArr = [
            { x: 6, y: 7 }
        ];
        food = { x: 16, y: 17 };
        scorePoint = 0;
        score.innerText = `Score : ${scorePoint} `
    }


    // if food eaten 
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play()
        scorePoint++;
        score.innerText = `Score : ${scorePoint} `
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    }

    // snake movement
    for (i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // part 2 display snake and food


    // snake
    playGround.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("body")
        }
        playGround.appendChild(snakeElement);

    })
    // food

    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    playGround.appendChild(foodElement);


}



// main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    tex.classList.add("hide")
    inputDir = { x: 0, y: 1 };
    // music.play();
    switch (e.key) {
        case "ArrowUp":
        case "w":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowLeft":
        case "a":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
        case "d":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowDown":
        case "s":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
    }
});
