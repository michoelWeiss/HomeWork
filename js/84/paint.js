(function (){
    'use strict';
    const canvas = document.querySelector('#theCanvas');
    const context = canvas.getContext('2d');
    
    canvas.width = 1000;
    canvas.height = 800;
    
    function drawRectangle(x, y, width, height, color) {
      context.fillStyle = color;
      context.fillRect(x, y, width, height);
    }
    
    function drawCircle(x, y, radius, color) {
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = color;
      context.fill();
      context.closePath();
    }
    
    function drawTriangle(x1, y1, x2, y2, x3, y3, color) {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.lineTo(x3, y3);
      context.closePath();
      context.fillStyle = color;
      context.fill();
    }

    for (let i = 0; i < 4; i++) {
      drawTriangle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
      );
    }
    for (let i = 0; i < 4; i++) {
      drawRectangle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 200,
        Math.random() * 200,
        `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
      );
    }
    
    for (let i = 0; i < 4; i++) {
      drawCircle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 200,
        `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
      );
    }
    
          
    
}());    