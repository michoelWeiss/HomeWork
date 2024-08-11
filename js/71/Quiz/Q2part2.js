
window.app = (function (myApp) {
'use strict';

myApp.createCounter = createCounter || {};

function createCounter(){
    let count = 0;
   
    return {
        increment: () => {count++;},
        getCount: () => count
    }    
}

return myApp;

}(window.app || {}));
