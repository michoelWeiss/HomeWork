window.pcsMessageBox = (function () {
  'use strict';

  const width = 240;
  const height = 180;
  let offsetLeft = -(width / 2);
  let offsetTop = -(height / 2);

  return function (msg, buttArray , funcArray) {

    const div = document.createElement('div');
    div.style.boxSizing = 'border-box';
    div.style.backgroundColor = 'lightcyan';
    div.style.border = '1px solid black';
    div.style.padding = '1em';
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.style.position = 'absolute';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.marginTop = `${offsetTop}px`;
    div.style.marginLeft = `${offsetLeft}px`;

    const msgDiv = document.createElement('div');
    msgDiv.innerText = msg;
    msgDiv.style.overflow = 'auto';
    msgDiv.style.height = '7em';

   const buttonDiv = document.createElement('div');
    buttonDiv.style.position = 'absolute';
    buttonDiv.style.width = '100%';
    buttonDiv.style.bottom = '1em';
    buttonDiv.style.textAlign = 'center';
    buttonDiv.style.left = 0;

    if(buttArray){

      for(let i = 0; i < buttArray.length; i++ ){
        const newButton = document.createElement('button');
        newButton.innerText = `${buttArray[i]}`;
        newButton.style.margin = '3px';
        newButton.addEventListener('click', () => {

          (funcArray && funcArray[i]) ? funcArray[i]() : // needs to be explicitly called 
           console.log(`${buttArray[i]} button was pushed`);
          
          div.remove();
        });
          
        
        buttonDiv.appendChild(newButton);
      }
    }
    else {

      console.log('defalt ok button')

    const okButton = document.createElement('button');
    okButton.innerText = 'ok';
    okButton.addEventListener('click', () => {
      div.remove();
      console.log('ok button was pushed');
    });

    buttonDiv.appendChild(okButton);
    }
   
   

    div.appendChild(msgDiv);
    div.appendChild(buttonDiv);
    document.body.appendChild(div);

    offsetTop += 20;
    offsetLeft += 20;

    if(height + offsetTop + (window.innerHeight / 2) > window.innerHeight) {
      offsetTop -= window.innerHeight - height;
    }
    if (width + offsetLeft + (window.innerWidth / 2) > window.innerWidth) {
      offsetLeft -= window.innerWidth - width;
    }

  };
}());
