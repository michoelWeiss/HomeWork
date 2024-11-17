(function () {
    'use strict';

    const SNAKE_SIZE = 64;

    const theCanvas = document.querySelector('#theCanvas');
    const context = theCanvas.getContext('2d');

    function resizeCanvas() {
        theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
        theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
    }

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();

    let direction = 'ArrowRight';

    class Snake{
        #crashSound = document.createElement('audio');
        #eatSound = document.createElement('audio');
        constructor(){
            this.img = document.createElement('img');
            this.img.src = 'imageAndSound/snakeHead.png';
            this.#crashSound.src = 'imageAndSound/crashing.mp4'; 
            this.#eatSound.src = 'imageAndSound/eating.mp4';

            this.x = 0;
            this.y = 0;

            this.applesEaten = 0;
        }
        eat(){
            this.applesEaten += 1;
            this.#eatSound.play();
        }
        crash(){
            this.#crashSound.play();
        }
        move(direction){
            switch (direction) {
                case 'ArrowRight':
                    this.x += SNAKE_SIZE;
                    break;
                case 'ArrowLeft':
                    this.x -= SNAKE_SIZE;
                    break;
                case 'ArrowUp':
                    this.y -= SNAKE_SIZE;
                    break;
                case 'ArrowDown':
                    this.y += SNAKE_SIZE;
                    break;
            }
        }
        draw(context) {
            context.drawImage(this.img, this.x, this.y);
            this.displayScore(context);
        }
        displayScore(context){
            context.fillText(`You Ate ${this.applesEaten} Apples`, 100, 100)
        }
    }
    class Apple {
        constructor() {
            this.img = document.createElement('img');
            this.img.src = 'imageAndSound/apple.jpg';
            this.img.width = SNAKE_SIZE;
            this.img.height = SNAKE_SIZE;

            this.x = 0;
            this.y = 0;
            this.picLocation();
        }
        picLocation() {
            const maxCols = Math.floor(theCanvas.width / SNAKE_SIZE);
            const maxRows = Math.floor(theCanvas.height / SNAKE_SIZE);

            this.x = Math.floor(Math.random() * maxCols) * SNAKE_SIZE;
            this.y = Math.floor(Math.random() * maxRows) * SNAKE_SIZE;
        }
        draw(context) {
            context.drawImage(this.img, this.x, this.y);
        }
    }

    const apple = new Apple();
    apple.img.onload = () => {
        apple.draw(context); 
    };

    const snakeHead = new Snake();
    let intervalId;
    let gameRunning = true;
    snakeHead.img.onload = () => {
        intervalId = setInterval(() => {
            if (!gameRunning) {
                clearInterval(intervalId); 
                return;
            }
            snakeHead.move(direction);
            if (!hitWall(snakeHead.x, snakeHead.y)) {
                gameRunning = false; 
                snakeHead.crash();
            } else {
                context.clearRect(0, 0, theCanvas.width, theCanvas.height);
                snakeHead.draw(context);
                apple.draw(context);
            }
            if (snakeHead.x === apple.x && snakeHead.y === apple.y) {
                snakeHead.eat();
                apple.picLocation();
            }
        }, 350);
    };

    document.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'ArrowDown':
                direction = e.key;
        }
    });

    function hitWall(x, y) {
        if (x < 0 || x + SNAKE_SIZE > theCanvas.width) {
            return false;
        }
        else if (y < 0 || y + SNAKE_SIZE > theCanvas.height) {
            return false;
        }
        return true;
    }
}());
