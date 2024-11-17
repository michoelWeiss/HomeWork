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

  class Ball {
    constructor(color, radius) {
      this.radius = radius;
      this.color = color;
      this.x = this.radius;
      this.y = this.radius;
      this.minY = this.radius;
      this.dx = 5;
      this.dy = 17.5;
    }

    draw() {
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();

      return this;
    }

    move(delta) {
      this.x += (this.dx * (delta * 0.015));
      this.y += (this.dy * (delta * 0.015));

      if (this.x >= theCanvas.width - this.radius || this.x <= this.radius) {
        this.dx = -this.dx;
      }

      if (this.y >= theCanvas.height - this.radius || this.y <= this.minY) {
        this.dy = -this.dy;
      }

      if (this.y >= theCanvas.height - this.radius) {
        this.minY += this.minY * .25;
        this.dy -= this.dy * .001;
        this.dx -= this.dx * .001;

        if (this.minY >= theCanvas.height - this.radius) {
          this.minY = theCanvas.height - this.radius;
        }

        if (this.y > theCanvas.height - this.radius) {
          this.y = theCanvas.height - this.radius;
        } else if (this.y < this.minY) {
          this.y = this.minY;
        }
      }

      return this;
    }
  }
  const balls = [new Ball('blue', 50)];

  let previousTime = 0;
  function drawBalls(timestamp) {
    const delta = timestamp - previousTime;
    previousTime = timestamp;
    console.log(delta);

    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    balls.forEach(ball => ball.move(delta).draw());

    requestAnimationFrame(drawBalls);
  }
  requestAnimationFrame(drawBalls);

  const ballColor = document.querySelector('#color');
  const ballRadius = document.querySelector('#radius');

  document.querySelector('#addBallForm').addEventListener('submit', e => {
    e.preventDefault();

    balls.push(new Ball(ballColor.value, +ballRadius.value));
  });

}());
