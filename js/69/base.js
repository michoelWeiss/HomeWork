(function(){
    'use strict';
const button = document.querySelector('button');


//   button.addEventListener('click', newButt);
document.body.addEventListener('click', newButt);
let num = 1;

function newButt(event) {
    if (event.target.tagName === 'BUTTON') {
        const myNewButton = document.createElement('button');
        document.body.appendChild(myNewButton);
        //  myNewButton.addEventListener('click', newButt); 
        num++;
        myNewButton.innerText = `${num}`;
    }

}
}());


