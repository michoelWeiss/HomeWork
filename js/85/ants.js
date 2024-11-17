(function () {
    'use strict';
  
    const theCanvas = document.querySelector('#theCanvas');
    const context = theCanvas.getContext('2d');
  
    function resizeCanvas() {
      theCanvas.width = window.innerWidth;
      theCanvas.height = window.innerHeight;
    }
  
    window.addEventListener('resize', resizeCanvas);
  
    resizeCanvas();
  
    class Ant {
      static ANT_WIDTH = 2;
      static ANT_HEIGHT = 4;
  
      constructor(color) {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.color = color;
      }
  
      draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, Ant.ANT_WIDTH, Ant.ANT_HEIGHT);
        context.stroke();
      }
  
      move() {
        if (!--this.brains) {
          this.brains = Ant.getRandomNumber(1, 75);
          this.dx = Ant.getRandomNumber(-1, 1);
          this.dy = Ant.getRandomNumber(-1, 1);
        }
  
        this.x += this.dx;
        this.y += this.dy;
  
        if (this.x < Ant.ANT_WIDTH) {
          this.x = Ant.ANT_WIDTH;
        } else if (this.x > theCanvas.width - Ant.ANT_WIDTH) {
          this.x = theCanvas.width - Ant.ANT_WIDTH;
        }
  
        if (this.y < Ant.ANT_HEIGHT) {
          this.y = Ant.ANT_HEIGHT;
        } else if (this.y > theCanvas.height - Ant.ANT_HEIGHT) {
          this.y = theCanvas.height - Ant.ANT_HEIGHT;
        }
  
        this.draw();
      }
  
      static getRandomNumber(min, max) {
        return Math.floor(Math.random() * ((max - min) + 1)) + min;
      }
    }
    const ants = [];
    for(let i = 0; i < 2000; i++) {
      ants.push(new Ant(i % 2 === 0 ? 'black' : 'red'));
    }
  
    setInterval(() => {
      context.clearRect(0, 0, theCanvas.width, theCanvas.height);
      ants.forEach(ant => ant.move());
    }, 100);
  
    const antColor = document.querySelector('#color');
    const population = document.querySelector('#population');
  
    document.querySelector('#addAntsForm').addEventListener('submit', e => {
      e.preventDefault();
  
      for(let i = 0; i < Number(population.value); i++) {
        ants.push(new Ant(antColor.value));
      }
    });
  }());
  